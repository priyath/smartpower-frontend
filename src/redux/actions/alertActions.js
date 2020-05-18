export const DISMISS_ALERT = 'DISMISS_ALERT';

export function onDismissAlert(alertId) {
    return {
        type: DISMISS_ALERT,
        payload: {
            alertId
        }
    };
}
