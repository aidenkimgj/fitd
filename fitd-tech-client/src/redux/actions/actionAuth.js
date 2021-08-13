import * as types from '../constants/actionTypes';

const actionSignUp = (formData) => {
    return {
        type: types.SIGN_UP_USER_REQUEST,
        payload: formData,
    };
};

const actionSignIn = (formData, history) => {
    return {
        type: types.SIGN_IN_USER_REQUEST,
        payload: formData,
        history: history,
    };
};

const actionLogout = () => {
    return {
        type: types.LOGOUT_REQUEST,
        // payload: _id,
    };
};

export { actionSignUp, actionSignIn, actionLogout };
