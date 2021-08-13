import * as types from '../constants/actionTypes';

const initialState = {
    users: undefined,
    applications: undefined,
    loading: false,
    err: '',
};

const getUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS_REQUEST:
            return { ...state, loading: true };
        case types.GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, applications: action.applications };
        case types.GET_USERS_FAIL:
            return { ...state, loading: false, err: action.payload };
        default:
            return state;
    }
}
export default getUsersReducer;