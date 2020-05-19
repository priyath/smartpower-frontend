import { fetchRealtimeData, fetchTodayStats, loadThresholds } from "../../repositories/dashboardRepository";
import { checkAlerts } from "./alertActions";

export const ON_GAUGE_SELECT = 'ON_GAUGE_SELECT';
export const UPDATE_REALTIME_DATA = 'UPDATE_REALTIME_DATA';
export const UPDATE_TODAY_STATS = 'UPDATE_TODAY_STATS';

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
        loadThresholds().then((thresholdResponse) => {
            fetchTodayStats(location).then((statsResponse) => {
                dispatch(updateTodayStats({thresholdResponse, statsResponse}));
            })
        })
    }
}
