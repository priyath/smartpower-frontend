import { fetchRealtimeData, fetchTodayStats } from "../../repositories/dashboardRepository";

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

export function updateTodayStats(todayStats) {
    return {
        type: UPDATE_TODAY_STATS,
        payload: todayStats
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
            }
        })
    }
}

export function initDashboardData() {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        fetchTodayStats(location).then((response) => {
            dispatch(updateTodayStats(response));
        })
    }
}
