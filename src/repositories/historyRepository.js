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

export const fetchHistoryData = (filter) => {
    let formData = {calltype: 'History-Data', filter: filter};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const fetchHistoryDrilldownData = (formData) => {
    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};
