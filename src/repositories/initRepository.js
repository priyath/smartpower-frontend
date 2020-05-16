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

export const fetchBranchList = () => {
    console.log('fetch branch list');
    let formData = {calltype: 'User-Locations', filter: 'Vajira'};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};