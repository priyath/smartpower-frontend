import axios from 'axios';

const REALTIME_API_ENDPOINT = 'http://54.146.53.76:80/api';

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
    console.log('fetch real time data');
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
    let formData = {calltype: 'Comparison-Data', filter: location, fromDate: fromDate, toDate: toDate, granularity: granularity};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};
