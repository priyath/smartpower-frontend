import { fetchBranchList } from "../../repositories/initRepository";

export const LOAD_BRANCH_DETAILS = 'LOAD_BRANCH_DETAILS';
export const UPDATE_BRANCH_SELECTION = 'UPDATE_BRANCH_SELECTION';

export function updateBranchDetails(payload) {
    return {
        type: LOAD_BRANCH_DETAILS,
        payload
    };
}

export function updateBranchSelection(payload) {
    return {
        type: UPDATE_BRANCH_SELECTION,
        payload
    };
}

export function loadBranchDetails() {
    console.log('loading branch details');
    return (dispatch) => {
        console.log('loading branch details');
        fetchBranchList().then((response) => {
            dispatch(updateBranchDetails(response));
        })
    }
}
