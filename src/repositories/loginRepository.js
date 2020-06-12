import {AUTH_API_ENDPOINT} from './APIConstants';
import {axiosFetchJSON} from './fetchAPI';

export const authUser = ({username, password}) => {
    let formData = {username, password};

    return axiosFetchJSON(AUTH_API_ENDPOINT + '/users/login', 'POST', formData)
        .then(response => response)
        .catch((e) => {
            throw e;
        }
    );
};
