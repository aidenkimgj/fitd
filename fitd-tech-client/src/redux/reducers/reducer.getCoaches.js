import * as types from '../constants/actionTypes';

const initialState = {
    coaches: undefined,
    loading: false,
    err: '',
};

const getCoachesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COACHES_REQUEST:
            return { ...state, loading: true };
        case types.GET_COACHES_SUCCESS:
            return { ...state, loading: false, coaches: action.payload };
        case types.GET_COACHES_FAIL:
            return { ...state, loading: false, err: action.payload };
        default:
            return state;
    }
}
export default getCoachesReducer;