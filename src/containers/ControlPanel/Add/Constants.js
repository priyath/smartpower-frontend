const errorMessages = {
    409: 'User with same username/email already exists.',
    201: 'New user saved successfully.',
    default: 'Something went wrong during user creation.'
}

export const getErrorMessage = (code) => {
    const errorMsg = errorMessages[code];
    return errorMsg ? errorMsg : errorMessages['default'];
}
