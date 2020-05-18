import {
    DISMISS_ALERT
} from '../actions/alertActions';
import {removeAlert, addAlerts} from '../../logic/alertManager';
import { fromJS } from 'immutable';
import {UPDATE_REALTIME_DATA, UPDATE_TODAY_STATS} from "../actions/dashboardActions";

const initialState = {
    alerts: [],
    timeSinceLastAlert: {
        'Frequency': 0,
        'Current Average': 0,
        'Voltage L N avg': 0,
        'Power Factor Average': 0,
        'Active Power Phase 1': 0,
        'Power Factor Phase 1': 0,
    },
    thresholds: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DISMISS_ALERT:
            state = fromJS(state);
            return state
                .set('alerts', removeAlert(state.get('alerts').toJS(), action.payload.alertId))
                .toJS();
        case UPDATE_REALTIME_DATA:
            state = fromJS(state);
            const alerts = state.get('alerts').toJS();
            const thresholds = state.get('thresholds').toJS();
            const timeSinceLastAlert = state.get('timeSinceLastAlert').toJS();
            const realtimeData = action.payload.data;
            const alertObject = addAlerts(alerts, thresholds, realtimeData, timeSinceLastAlert);
            return state
                .set('alerts', alertObject.alerts)
                .set('timeSinceLastAlert', alertObject.timeSinceLastAlert)
                .toJS();
        case UPDATE_TODAY_STATS:
            state = fromJS(state);
            const thresholdResponse = action.payload.thresholdResponse;
            return state
                .set('thresholds', thresholdResponse.data)
                .toJS();
        default:
            return state;
    }
}
