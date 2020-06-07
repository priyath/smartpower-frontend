const appendZero = (num) => {
    return num >= 10 ? num : "0" + num
}

const formatDate = (step, year, month, day, hour) => {
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

export const getDateBasedOnGranularity = (date, step) => {
    if (!date)
        date = new Date();
    const year = date.getFullYear();
    const month = appendZero(date.getMonth() + 1);
    const day = appendZero(date.getDate());
    let hour = appendZero(date.getHours());

    return formatDate(step, year, month, day, hour);
}

export const getCurrentMonthRange = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = appendZero(date.getMonth() + 1);

    const firstDay = appendZero(new Date(year, month, 1).getDate());
    const lastDay = appendZero(new Date(year, (month + 1), 0).getDate());

    return {fromDate: formatDate('hour', year, month, firstDay), toDate: formatDate('hour', year, month, lastDay)}
}

export const getCurrentMonthDay = () => {
    return appendZero(new Date().getDate());
}

export const daysInMonth  = () => {
    const date = new Date();
    return new Date(date.getFullYear(), (date.getMonth()+1), 0).getDate();
}
