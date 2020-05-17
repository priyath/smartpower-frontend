import {
    LOAD_BRANCH_DETAILS,
    UPDATE_BRANCH_SELECTION,
} from '../actions/topbarActions';
import { fromJS } from 'immutable';

const initialState = {
    branchDetails: null,
    selectedBranchIdx: 0,
    initialLoad: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_BRANCH_DETAILS:
            return fromJS(state)
                .set('branchDetails', action.payload.data)
                .set('initialLoad', true)
                .toJS();
        case UPDATE_BRANCH_SELECTION:
            return fromJS(state).set('selectedBranchIdx', action.payload).toJS();
        default:
            return state;
    }
}
