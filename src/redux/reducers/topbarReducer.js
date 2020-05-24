import {
    LOAD_BRANCH_DETAILS,
    UPDATE_BRANCH_SELECTION,
} from '../actions/topbarActions';
import { fromJS } from 'immutable';

const initialState = {
    branchDetails: null,
    selectedBranchIdx: 0,
    initialLoad: false,
    selectedBranchName: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_BRANCH_DETAILS:
            return fromJS(state)
                .set('branchDetails', action.payload.data)
                .set('initialLoad', true)
                .set('selectedBranchName', action.payload.data[0].location)
                .toJS();
        case UPDATE_BRANCH_SELECTION:
            state = fromJS(state);
            return state
                .set('selectedBranchIdx', action.payload)
                .set('selectedBranchName', state.get('branchDetails').get(action.payload).location)
                .toJS();
        default:
            return state;
    }
}
