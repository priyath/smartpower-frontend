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

export const fetchBranchList = () => {
    let formData = {calltype: 'User-Locations', filter: 'Vajira'};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const updateBranchList = ({location, geoLng, geoLat, contactName, contactEmail, contactPhone}) => {
    let formData = {calltype: 'Update-Locations', filter: location, geoLng, geoLat, contactName, contactEmail, contactPhone};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};

export const addNewBranch = ({location, geoLng, geoLat, contactName, contactEmail, contactPhone}) => {
    let formData = {calltype: 'Add-Locations', location, geoLng, geoLat, contactName, contactEmail, contactPhone};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};
