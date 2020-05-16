import {
    LOAD_BRANCH_DETAILS,
    UPDATE_BRANCH_SELECTION,
} from '../actions/topbarActions';
import { fromJS } from 'immutable';

const initialState = {
    branchDetails: null,
    selectedBranchIdx: 0,
};

export default function (state = initialState, action) {
    state = fromJS(state);
    switch (action.type) {
        case LOAD_BRANCH_DETAILS:
            return state.set('branchDetails', action.payload.data).toJS();
        case UPDATE_BRANCH_SELECTION:
            return state.set('selectedBranchIdx', action.payload).toJS();
        default:
            return state.toJS();
    }
}
