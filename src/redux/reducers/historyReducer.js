import {UPDATE_HISTORY_DATA} from "../actions/historyActions";
import {getAllGaugeHistoryData} from "../../logic/historyManager";
import {fromJS} from "immutable";

const initialState = {
    historyLoaded: false,
    historyData: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_HISTORY_DATA:
            state = fromJS(state);
            return fromJS(state)
                .set('historyLoaded', true)
                .set('historyData', getAllGaugeHistoryData(action.payload.data))
                .toJS();
        default:
            return state;
    }
}

