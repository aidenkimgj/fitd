import * as types from '../constants/actionTypes';

const actionGetUsers = () => {
    return {
        type: types.GET_USERS_REQUEST,
    };
};

export default actionGetUsers;