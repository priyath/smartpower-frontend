import {} from '../../logic/branchSummaryManager';
import {} from '../../repositories/branchSummaryRepository';

export const GENERIC_EVENT = 'GENERIC_EVENT'

export function genericAction(payload) {
    return {
        type: GENERIC_EVENT,
        payload: payload
    };
}
