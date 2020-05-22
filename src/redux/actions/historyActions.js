//import {} from '../../logic/';
import {fetchHistoryData} from '../../repositories/historyRepository';

export const UPDATE_HISTORY_DATA = 'UPDATE_HISTORY_DATA'

export function updateHistoryData(historyResponse) {
    return {
        type: UPDATE_HISTORY_DATA,
        payload: historyResponse

    };
}

export function loadHistoryData() {
    return (dispatch, getState) => {
        const selectedBranchIdx = getState().topbar.selectedBranchIdx;
        const location = getState().topbar.branchDetails[selectedBranchIdx].location;
        fetchHistoryData(location).then((historyResponse) => {
            dispatch(updateHistoryData(historyResponse));
        })
    }
}
