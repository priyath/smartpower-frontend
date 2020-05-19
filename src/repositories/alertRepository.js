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

// {"calltype":"Alert-Record","filter":{"alerthour":"10","alertminute":"9","alertdate":"2020-05-19 04:39:49","alertdescription":"Power analyzer indicates an alert at LOLC Head Office -01 -Voltage L N avg is 231.61 upper thresould is :230 and lower thresould is :210","alertstatus":"Active","location":"LOLC Head Office -01","scantype":"Voltage L N avg","readingvalue":231.61,"primarycontact":"","primaryemail":"","secondarycontact":"","secondaryemail":"","cameraurl":""}}

export const persistAlertToDatabase = (filter) => {
    let formData = {calltype: 'Alert-Record', filter: filter};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const fetchAlertsFromDatabase = (filter) => {
    let formData = {calltype: 'Alerts-Log-CP', filter: filter};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};
