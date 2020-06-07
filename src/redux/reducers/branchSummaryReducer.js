import {PENDING_BRANCH_SUMMARY, UPDATE_BRANCH_SUMMARY} from "../actions/branchSummaryActions";
import {transformBranchSummaryData} from "../../logic/branchSummaryManager";
import {fromJS} from "immutable";

const initialState = {
    branchSummaryDetails: [],
    branchSummaryLoaded: false,
    fetchingBranchSummary: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_BRANCH_SUMMARY:
            state = fromJS(state);
            const branchSummaryDetails = transformBranchSummaryData(action.payload);
            return state
                .set('branchSummaryDetails', branchSummaryDetails)
                .set('branchSummaryLoaded', true)
                .set('fetchingBranchSummary', false)
                .toJS();
        case PENDING_BRANCH_SUMMARY:
            return fromJS(state)
                .set('fetchingBranchSummary', true)
                .toJS();
        default:
            return state;
    }
}

