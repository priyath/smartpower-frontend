import {retrieveNewAlerts, transformAlertToPersist} from '../../logic/alertManager';
import {persistAlertToDatabase, fetchAlertsFromDatabase} from '../../repositories/alertRepository';

export const DISMISS_ALERT = 'DISMISS_ALERT';
export const ADD_NEW_ALERTS = 'ADD_NEW_ALERTS';
export const SET_PERSISTED_ALERTS = 'SET_PERSISTED_ALERTS';

export function onDismissAlert(alertId) {
    return {
        type: DISMISS_ALERT,
        payload: {
            alertId
        }
    };
}

export function addNewAlerts(alertObject) {
    return {
        type: ADD_NEW_ALERTS,
        payload: alertObject

    };
}

export function checkAlerts(realtimeDataResponse) {
    return (dispatch, getState) => {
        const realtimeData = realtimeDataResponse.data;
        const timeSinceLastAlert = getState().alert.timeSinceLastAlert;
        const thresholds = getState().alert.thresholds;
        const alertObject = retrieveNewAlerts(thresholds, realtimeData, timeSinceLastAlert);
        if (alertObject.newAlerts.length > 0){
            dispatch(addNewAlerts(alertObject));
        }
    }
}

export function setPersistedAlerts(alertListResponse) {
    return {
        type: SET_PERSISTED_ALERTS,
        payload: alertListResponse,
    };
}

export function fetchAlerts() {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        fetchAlertsFromDatabase(location).then((response) => {
            dispatch(setPersistedAlerts(response))
        })
    }
}
