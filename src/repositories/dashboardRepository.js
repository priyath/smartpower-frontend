import axios from 'axios';

const REALTIME_API_ENDPOINT = 'http://54.146.53.76:80/api';

export const fetchRealtimeData = () => {
    let formData = {calltype: 'Real Time', filter: 'LOLC Head Office -01'};

    return axios(REALTIME_API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/x-www-form-urlencoded'
        },
        data: 'json='+JSON.stringify(formData)
    })
    .then(response => response);
};
