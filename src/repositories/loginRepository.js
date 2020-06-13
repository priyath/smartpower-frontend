import {AUTH_API_ENDPOINT} from './APIConstants';
import {axiosFetchJSON} from './fetchAPI';

export const authUser = ({username, password}) => {
    let formData = {username, password};

    //TODO: remove this once auth API is deployed
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({data: {
            username: 'admin',
            accessToken: '3434j3kn43j4nk3j4erdr'
        }}), 500);
    })

    return axiosFetchJSON(AUTH_API_ENDPOINT + '/users/login', 'POST', formData)
        .then(response => response)
        .catch((e) => {
            throw e;
        }
    );
};
