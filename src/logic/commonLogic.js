const appendZero = (num) => {
    return num >= 10 ? num : "0" + num
}

export const getDateBasedOnGranularity = (date, step) => {
    if (!date)
        date = new Date();
    const year = date.getFullYear();
    const month = appendZero(date.getMonth() + 1);
    const day = appendZero(date.getDate());
    let hour = appendZero(date.getHours());

    switch (step){
        case 'day':
            return '' + year + '-' + month;
        case 'hour':
            return '' + year + '-' + month + '-' + day;
        case 'min':
            return '' + year + '-' + month + '-' + day + ' ' + hour;
        default:
            return null;
    }
}
