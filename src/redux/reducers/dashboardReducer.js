import {
} from '../actions/dashboardActions';

const initialState = {
    todayStats: {
        peak: 250,
        low: 140.5,
        high: 250
    },
    consumption: 500,
    cost: 14500
};

export default function (state = initialState, action) {
    return state;
}
