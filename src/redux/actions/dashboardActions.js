import { fetchRealtimeData } from "../../repositories/dashboardRepository";

export const ON_GAUGE_SELECT = 'ON_GAUGE_SELECT';
export const UPDATE_REALTIME_DATA = 'UPDATE_REALTIME_DATA';

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

export function getRealTimeData() {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        fetchRealtimeData(location).then((response) => {
            dispatch(updateRealtimeData(response));
        })
    }
}
