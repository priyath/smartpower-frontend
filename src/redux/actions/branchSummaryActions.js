import {} from '../../logic/branchSummaryManager';
import {fetchBranchSummary} from '../../repositories/branchSummaryRepository';

export const UPDATE_BRANCH_SUMMARY = 'UPDATE_BRANCH_SUMMARY';
export const PENDING_BRANCH_SUMMARY = 'PENDING_BRANCH_SUMMARY';

export function updateRealtimeData(summaryData) {
    return {
        type: UPDATE_BRANCH_SUMMARY,
        payload: summaryData
    };
}

export function pendingBranchSummary() {
    return {
        type: PENDING_BRANCH_SUMMARY,
    };
}

export function getBranchSummary(branchList, filterOptions) {
    return (dispatch, getState) => {
        let promises = [];
        branchList.forEach((branch) => {
            const params = {
                filter: branch.location,
                fromDate: filterOptions && filterOptions.fromDate ? filterOptions.fromDate : '',
                toDate: filterOptions && filterOptions.toDate ? filterOptions.toDate : '',
            }
            promises.push(fetchBranchSummary(params));
        })
        Promise.all(promises).then(resp => {
            const concatSummaryData = resp.reduce((acc, respObject) => {
                return acc.concat(respObject.data);
            }, [])
            dispatch(updateRealtimeData(concatSummaryData));
        })
        dispatch(pendingBranchSummary());
    }
}
