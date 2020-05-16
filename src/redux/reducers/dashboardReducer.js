import {ON_GAUGE_SELECT, UPDATE_REALTIME_DATA} from '../actions/dashboardActions';
import { updateGaugeSelection, updateGaugeRealtimeData } from '../../logic/dashboard';
import { fromJS } from 'immutable';
import { heartbeatInitializationData as realtimeData } from '../../constants/dashboardConstants';
import { CHANGE_SIDEBAR_VISIBILITY } from "../actions/sidebarActions";
import { UPDATE_BRANCH_SELECTION } from "../actions/topbarActions";

const initialState = {
    todayStats: {
        peak: 250,
        low: 140.5,
        high: 250,
        consumption: 500,
        cost: 14500,
    },
    heartbeat: {
        data:[
            { name: 1, uv: 500 },
            { name: 2, uv: 500 },
            { name: 3, uv: 500 },
            { name: 4, uv: 500 },
            { name: 5, uv: 500 },
            { name: 6, uv: 500 },
            { name: 7, uv: 500 },
            { name: 8, uv: 500 },
            { name: 9, uv: 500 },
            { name: 10, uv: 2 },
        ]
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
    redraw: false,
};

export default function (state = initialState, action) {
    state = fromJS(state);
    const gauges = state.get('gauges').toJS();
    switch (action.type) {
        case ON_GAUGE_SELECT:
            const selectedGaugeId = action.payload.selectedGaugeId;
            return state
                .set('gauges', updateGaugeSelection(gauges, selectedGaugeId))
                .set('selectedGaugeIdx', selectedGaugeId-1)
                .toJS();
        case UPDATE_REALTIME_DATA:
            const realtimeData = action.payload.data;
            return state
                .set('gauges', updateGaugeRealtimeData(gauges, realtimeData))
                .set('redraw', false)
                .toJS();
        case UPDATE_BRANCH_SELECTION:
            return state
                .set('gauges', initialState.gauges)
                .set('redraw', true)
                .toJS();
        case CHANGE_SIDEBAR_VISIBILITY:
            return state
                .set('redraw', true)
                .toJS();
        default:
            return state.toJS();
    }
}
