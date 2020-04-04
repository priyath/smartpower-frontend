import {
} from '../actions/dashboardActions';

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
    }
};

export default function (state = initialState, action) {
    return state;
}
