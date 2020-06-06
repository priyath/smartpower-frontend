import axios from 'axios';

const REALTIME_API_ENDPOINT = 'http://3.91.188.96:80/api';

const axiosFetch = (endpoint, method, data) => {
    return axios(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'Application/x-www-form-urlencoded'
        },
        data: 'json='+JSON.stringify(data)
    });
};

export const fetchRealtimeData = (location) => {
    let formData = {calltype: 'Real Time', filter: location};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const fetchTodayStats = (location) => {
    let formData = {calltype: 'Today-Stats', filter: location};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const fetchTodayConsumption = (location) => {
    let formData = {calltype: 'Today-Data', filter: location};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const loadThresholds = (location) => {
    let formData = {calltype: 'Load-Thresholds', filter: ''};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const fetchComparisonData = ({location, fromDate, toDate, granularity}) => {
    //TODO dynamically set location
    let formData = {calltype: 'Comparison-Data', filter: 'LOLC Head Office -01', fromDate: fromDate, toDate: toDate, granularity: granularity};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};
