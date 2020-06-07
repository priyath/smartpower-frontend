import { fetchRealtimeData, fetchTodayConsumption, loadThresholds, fetchComparisonData } from "../../repositories/dashboardRepository";
import { fetchBranchSummary } from "../../repositories/branchSummaryRepository";
import { getCurrentMonthRange } from "../../logic/commonLogic";
import { checkAlerts } from "./alertActions";

export const ON_GAUGE_SELECT = 'ON_GAUGE_SELECT';
export const UPDATE_REALTIME_DATA = 'UPDATE_REALTIME_DATA';
export const UPDATE_TODAY_STATS = 'UPDATE_TODAY_STATS';
export const UPDATE_COMPARISON_DATA = 'UPDATE_COMPARISON_DATA';

export function onGaugeSelect(selectedGaugeId) {
    return {
        type: ON_GAUGE_SELECT,
        payload: {
            selectedGaugeId
        }
    };
}

export function updateRealtimeData(realtimeData) {
    return {
        type: UPDATE_REALTIME_DATA,
        payload: realtimeData
    };
}

export function updateTodayStats(payload) {
    return {
        type: UPDATE_TODAY_STATS,
        payload: payload
    };
}

export function updateComparisonData(comparisonData) {
    return {
        type: UPDATE_COMPARISON_DATA,
        payload: comparisonData
    };
}

export function getRealTimeData() {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        fetchRealtimeData(location).then((response) => {
            const currentSelectedBranchIdx = getState().topbar.selectedBranchIdx;
            if (currentSelectedBranchIdx === selectedBranchIdx) {
                dispatch(updateRealtimeData(response));
                dispatch(checkAlerts(response));
            }
        })
    }
}

export function initDashboardData() {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        const {fromDate, toDate} = getCurrentMonthRange();
        loadThresholds().then((thresholdResponse) => {
            Promise.all([fetchBranchSummary({filter: location, fromDate, toDate}), fetchTodayConsumption(location)])
            .then((response) => {
                const statsResponse = response[0];
                const dataResponse = response[1];
                dispatch(updateTodayStats({thresholdResponse, statsResponse, dataResponse}));
            })
        })
    }
}

export function getComparisonData(uiPayload) {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        uiPayload['location'] = location;
        fetchComparisonData(uiPayload).then((response) => {
            const currentSelectedBranchIdx = getState().topbar.selectedBranchIdx;
            if (currentSelectedBranchIdx === selectedBranchIdx) {
                dispatch(updateComparisonData(response));
            }
        })
    }
}
