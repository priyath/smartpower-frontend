export const removeAlert = (alerts, id) => {
    alerts.splice(id, 1);
    return alerts;
}
