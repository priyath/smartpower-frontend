import {} from '../../logic/';
import {} from '../../repositories/';

export const GENERIC_EVENT = 'GENERIC_EVENT'

export function genericAction(payload) {
    return {
        type: GENERIC_EVENT,
        payload: payload
    };
}
