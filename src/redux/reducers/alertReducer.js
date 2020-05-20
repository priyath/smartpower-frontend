import {DISMISS_ALERT, ADD_NEW_ALERTS, SET_PERSISTED_ALERTS} from '../actions/alertActions';
import {removeAlert} from '../../logic/alertManager';
import { fromJS } from 'immutable';
import {UPDATE_TODAY_STATS} from "../actions/dashboardActions";
import {UPDATE_BRANCH_SELECTION} from "../actions/topbarActions";

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
    persistedAlertList: [],
    alertsLoaded: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DISMISS_ALERT:
            state = fromJS(state);
            return state
                .set('alerts', removeAlert(state.get('alerts').toJS(), action.payload.alertId))
                .toJS();
        case ADD_NEW_ALERTS:
            state = fromJS(state);
            const alerts = state.get('alerts').toJS();
            return state
                .set('alerts', alerts.concat(action.payload.newAlerts))
                .set('timeSinceLastAlert', action.payload.timeSinceLastAlert)
                .toJS();
        case UPDATE_TODAY_STATS:
            state = fromJS(state);
            const thresholdResponse = action.payload.thresholdResponse;
            return state
                .set('thresholds', thresholdResponse.data)
                .toJS();
        case SET_PERSISTED_ALERTS:
            state = fromJS(state);
            return state
                .set('persistedAlertList', action.payload.data)
                .set('alertsLoaded', true)
                .toJS();
        case UPDATE_BRANCH_SELECTION:
            return fromJS(state)
                .set('alertsLoaded', false)
                .toJS();
        default:
            return state;
    }
}

