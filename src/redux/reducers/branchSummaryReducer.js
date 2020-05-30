import {UPDATE_BRANCH_SUMMARY} from "../actions/branchSummaryActions";
import {} from "../../logic/branchSummaryManager";
import {fromJS} from "immutable";

const initialState = {
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_BRANCH_SUMMARY:
            console.log('branch summary: ', action.payload);
            state = fromJS(state);
            return state.toJS();
        default:
            return state;
    }
}

