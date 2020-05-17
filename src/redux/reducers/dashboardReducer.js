import {ON_GAUGE_SELECT, UPDATE_REALTIME_DATA, UPDATE_TODAY_STATS} from '../actions/dashboardActions';
import { updateGaugeSelection, updateGaugeRealtimeData, getTodayStats } from '../../logic/dashboard';
import { fromJS } from 'immutable';
import { heartbeatInitializationData as realtimeData } from '../../constants/dashboardConstants';
import { UPDATE_BRANCH_SELECTION, LOAD_BRANCH_DETAILS } from "../actions/topbarActions";

const initialState = {
    todayStats: {
        peak: 250,
        minVoltage: 0,
        maxVoltage: 0,
        consumption: 500,
        cost: 14500,
    },
    gauges: [
        {id: 1, selected: true, title: 'Frequency', avatar:'G1', value:0, realtimeData},
        {id: 2, selected: false, title: 'Active Power Phase 1', avatar:'G2', value:0, realtimeData},
        {id: 3, selected: false, title: 'Voltage L N avg', avatar:'G3', value:0, realtimeData},
        {id: 4, selected: false, title: 'Power Factor Average', avatar:'G4', value:0, realtimeData},
        {id: 5, selected: false, title: 'Power Factor Phase 1', avatar:'G5', value:0, realtimeData},
        {id: 6, selected: false, title: 'Current Average', avatar:'G6', value:0, realtimeData},
    ],
    selectedGaugeIdx: 0,
    initialLoad: false,
    dashboardLoad: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ON_GAUGE_SELECT:
            state = fromJS(state);
            const selectedGaugeId = action.payload.selectedGaugeId;
            return state
                .set('gauges', updateGaugeSelection(state.get('gauges').toJS(), selectedGaugeId))
                .set('selectedGaugeIdx', selectedGaugeId-1)
                .toJS();
        case UPDATE_REALTIME_DATA:
            state = fromJS(state);
            const realtimeData = action.payload.data;
            return state
                .set('gauges', updateGaugeRealtimeData(state.get('gauges').toJS(), realtimeData))
                .toJS();
        case UPDATE_BRANCH_SELECTION:
            return fromJS(state)
                .set('gauges', initialState.gauges)
                .set('dashboardLoad', false)
                .toJS();
        case UPDATE_TODAY_STATS:
            state = fromJS(state);
            const todayStats = state.get('todayStats').toJS();
            const rawStats = action.payload.data[0];
            const updatedStats = getTodayStats(todayStats,rawStats);
            return state
                .set('todayStats', updatedStats)
                .set('dashboardLoad', true)
                .toJS();
        case LOAD_BRANCH_DETAILS:
            return fromJS(state)
                .set('initialLoad', true)
                .toJS();
        default:
            return state;
    }
}
