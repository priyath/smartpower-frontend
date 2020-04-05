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
    return (dispatch) => {
        fetchRealtimeData().then((response) => {
            dispatch(updateRealtimeData(response));
        })
    }
}
