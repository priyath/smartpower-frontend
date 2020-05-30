import {UPDATE_BRANCH_SUMMARY} from "../actions/branchSummaryActions";
import {transformBranchSummaryData} from "../../logic/branchSummaryManager";
import {fromJS} from "immutable";

const initialState = {
    branchSummaryDetails: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_BRANCH_SUMMARY:
            state = fromJS(state);
            const branchSummaryDetails = transformBranchSummaryData(action.payload);
            return state
                .set('branchSummaryDetails', branchSummaryDetails)
                .toJS();
        default:
            return state;
    }
}

