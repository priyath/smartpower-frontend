import {} from '../../logic/branchSummaryManager';
import {fetchBranchSummary} from '../../repositories/branchSummaryRepository';

export const UPDATE_BRANCH_SUMMARY = 'UPDATE_BRANCH_SUMMARY'

export function updateRealtimeData(summaryData) {
    return {
        type: UPDATE_BRANCH_SUMMARY,
        payload: summaryData
    };
}

export function getBranchSummary(branchList, filterOptions) {
    return (dispatch, getState) => {
        branchList.forEach((branch) => {
            const params = {
                filter: branch.location,
                fromDate: filterOptions.fromDate ? filterOptions.fromDate : '',
                toDate: filterOptions.toDate ? filterOptions.toDate : '',
            }
            fetchBranchSummary(params).then((resp) => {
                dispatch(updateRealtimeData(resp.data));
            })
        })
    }
}
