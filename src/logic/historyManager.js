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
}

const nextStep = {
    'month': 'day',
    'day': 'hour',
    'hour': 'min',
}

export const getMonthDateRange = (year, month) => {
    const startDate = moment([year, month]).valueOf();
    const endDate = moment(startDate).endOf('month').valueOf();

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
                drilldown: true,
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

export const getHistoryFilters = (meta) => {
    return {
        calltype: 'History-Data',
        filter: 'LOLC Head Office -01',
        granularity: meta.step,
        fromDate: meta.from,
        toDate: meta.to,
    }
}
