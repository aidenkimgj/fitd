import * as types from '../constants/actionTypes';

const initialState = {
    success: undefined,
    loading: false,
    err: '',
};

const approveApplicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.APPROVE_APPLICATION_REQUEST:
            return { ...state, loading: true };
        case types.APPROVE_APPLICATION_SUCCESS:
            return { ...state, loading: false, success: true };
        case types.APPROVE_APPLICATION_FAIL:
            return { ...state, loading: false, success: false, err: action.payload };
        default:
            return state;
    }
}
export default approveApplicationReducer;