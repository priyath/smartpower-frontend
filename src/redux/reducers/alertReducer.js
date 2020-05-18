import {
    DISMISS_ALERT
} from '../actions/alertActions';
import {removeAlert, addAlerts} from '../../logic/alertManager';
import { fromJS } from 'immutable';
import {UPDATE_REALTIME_DATA, UPDATE_TODAY_STATS} from "../actions/dashboardActions";

const initialState = {
    alerts: [],
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
            const realtimeData = action.payload.data;
            return state
                .set('alerts', addAlerts(alerts, thresholds, realtimeData))
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
