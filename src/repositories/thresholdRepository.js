import {REALTIME_API_ENDPOINT} from './APIConstants';
import {axiosFetch} from './fetchAPI';

export const updateThresholds = ({key, upperThreshold, lowerThreshold}) => {
    let formData = {calltype: 'Update-Thresholds', key, upperThreshold, lowerThreshold};

    return axiosFetch(REALTIME_API_ENDPOINT, 'POST', formData)
        .then(response => response);
};
