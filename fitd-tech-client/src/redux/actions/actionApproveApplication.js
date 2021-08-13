import * as types from '../constants/actionTypes';

const actionApproveApplication = (userId) => {
    return {
        type: types.APPROVE_APPLICATION_REQUEST,
        payload: userId,
    };
};

export default actionApproveApplication;