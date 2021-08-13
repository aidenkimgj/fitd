import * as types from '../constants/actionTypes';

const actionGetCoaches = () => {
    return {
        type: types.GET_COACHES_REQUEST,
    };
};

export default actionGetCoaches;