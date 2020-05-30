import moment from 'moment';

const comparator = (a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
}

const steps = {
    'day': 86400000,
    'hour': 3600000,
    'min': 60000,
    'sec': 1,
}

const nextStep = {
    'month': 'day',
    'day': 'hour',
    'hour': 'min',
    'min': 'sec',
}

export const getMonthDateRange = (year, month) => {
    const startDate = moment([year, month]).valueOf();
    const endDate = moment(startDate).endOf('month').valueOf() + 1;

    return {startDate, endDate};
}

const createMonthBuckets = () => {
    let buckets = [];
    for (let i=0; i<12; i++){
        const {startDate, endDate} = getMonthDateRange(moment().year(), i);
        buckets.push({val: startDate, end: endDate, type: 'day'});
    }
    return buckets;
}

const createStepBuckets = (start, end, step, type) => {
    let buckets = [];
    while(start < end) {
        buckets.push({val: start, type: type, end: (start+step)});
        start = start + step;
    }
    return buckets;
}

const getDataMap = (data) => {
    let dataMap = {};
    data.forEach((el) => {
        dataMap[el.timestamp] = {
            id: el.id,
            location: el.location,
            voltage_ln_average: el.voltage_ln_average,
            frequency: el.frequency,
            timestamp: el.timestamp,
        }
    })
    return dataMap;
}


export const transformHistoryResponse = (data, meta) => {
    const historyDataMap = getDataMap(data);
    let buckets;
    if (meta && meta.drilldown) {
        //const {startDate, endDate} = getMonthDateRange(moment().year(), meta.month);
        buckets = createStepBuckets(meta.from, meta.to, steps[meta.step], nextStep[meta.step]);
    } else {
        buckets = createMonthBuckets();
    }

    return buckets.map((bucket, idx) => {
        const dataPoint = historyDataMap[bucket.val];
        if (dataPoint) {
            return {
                name: idx,
                x: bucket.val,
                y: dataPoint.voltage_ln_average,
                drilldown: bucket.type !== 'sec',
                step: bucket.type,
                from: bucket.val,
                to: bucket.end,
            }
        }
        return {
            name: idx,
            x: bucket.val,
            y: 0,
            drilldown: false,
            step: bucket.type,
            from: bucket.val,
            to: bucket.end,
        }
    });
    //return t;
}

const appendZero = (num) => {
    return num >= 10 ? num : "0" + num
}

export const getDateBasedOnGranularity = (timestamp, step) => {
    const date = new Date(timestamp);
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

export const getHistoryFilters = (meta) => {
    return {
        calltype: 'History-Data',
        filter: 'LOLC Head Office -01',
        granularity: meta.step,
        fromDate: getDateBasedOnGranularity(meta.from, meta.step),
        toDate: getDateBasedOnGranularity(meta.to, meta.step),
    }
}
