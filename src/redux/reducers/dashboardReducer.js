import {ON_GAUGE_SELECT, UPDATE_REALTIME_DATA} from '../actions/dashboardActions';
import { updateGaugeSelection } from '../../logic/dashboard';
import { fromJS } from 'immutable';

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
            { name: '1', uv: 500 },
            { name: '2', uv: 500 },
            { name: '3', uv: 500 },
            { name: '4', uv: 500 },
            { name: '5', uv: 500 },
            { name: '6', uv: 500 },
            { name: '7', uv: 500 },
            { name: '8', uv: 500 },
            { name: '9', uv: 500 },
            { name: '10', uv: 2 },
        ]
    },
    gauges: [
        {id: 1, selected: true, title: 'Frequency', avatar:'G1', value:55.6},
        {id: 2, selected: false, title: 'Active Power Phase 1', avatar:'G2', value:34.6},
        {id: 3, selected: false, title: 'Voltage L N avg', avatar:'G3', value:25.6},
        {id: 4, selected: false, title: 'Power Factor Average', avatar:'G4', value:1.6},
        {id: 5, selected: false, title: 'Power Factor Phase 1', avatar:'G5', value:5.6},
        {id: 6, selected: false, title: 'Current Average', avatar:'G6', value:55.6},
    ]
};

export default function (state = initialState, action) {
    state = fromJS(state);
    switch (action.type) {
        case ON_GAUGE_SELECT:
            const selectedGaugeId = action.payload.selectedGaugeId;
            const gauges = state.get('gauges').toJS();
            return state
                .set('gauges', updateGaugeSelection(gauges, selectedGaugeId))
                .toJS();
        case UPDATE_REALTIME_DATA:
            return state.toJS();
        default:
            return state.toJS();
    }
}
