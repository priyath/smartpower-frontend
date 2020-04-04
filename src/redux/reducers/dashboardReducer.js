import { ON_GAUGE_SELECT } from '../actions/dashboardActions';
import { updateGaugeSelection } from '../../logic/dashboard';
import { fromJS } from 'immutable';

const initialState = {
    todayStats: {
        peak: 250,
        low: 140.5,
        high: 250
    },
    consumption: 500,
    cost: 14500,
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
        {id: 0, selected: true, title: 'Current Phase 1', avatar:'G1', value:55.6},
        {id: 1, selected: false, title: 'Current Phase 2', avatar:'G2', value:34.6},
        {id: 2, selected: false, title: 'Current Phase 3', avatar:'G3', value:25.6},
        {id: 3, selected: false, title: 'Voltage Phase 1', avatar:'G4', value:1.6},
        {id: 4, selected: false, title: 'Voltage Phase 2', avatar:'G5', value:5.6},
        {id: 5, selected: false, title: 'Voltage Phase 3', avatar:'G6', value:55.6},
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
        default:
            return state.toJS();
    }
}
