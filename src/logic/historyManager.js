import moment from 'moment';

const comparator = (a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
}

export const getMonthDateRange = (year, month) => {
    return moment([year, month]).valueOf();
}

const createMonthBuckets = () => {
    let buckets = [];
    for (let i=0; i<12; i++){
        buckets.push(getMonthDateRange(moment().year(), i));
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


export const transformHistoryResponse = (data) => {
    const historyDataMap = getDataMap(data);
    const buckets = createMonthBuckets();

    return buckets.map((bucket) => {
        const dataPoint = historyDataMap[bucket];
        if (dataPoint) {
            return {
                x: bucket,
                y: dataPoint.voltage_ln_average,
                drilldown: true,
            }
        }
        return {
            x: bucket,
            y: 0,
            drilldown: false,
        }
    });
}
