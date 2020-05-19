import {retrieveNewAlerts, transformAlertToPersist} from '../../logic/alertManager';
import {persistAlertToDatabase} from '../../repositories/alertRepository';

export const DISMISS_ALERT = 'DISMISS_ALERT';
export const ADD_NEW_ALERTS = 'ADD_NEW_ALERTS';

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

            alertObject.newAlerts.map(alert => {
                const alertData = transformAlertToPersist(alert);
                persistAlertToDatabase(alertData).then(()=>{
                    console.log('alert persisted to database');
                });
            })
        }
    }
}
