import * as types from '../constants/actionTypes';

const initialState = {
	loading: false,
};

const resetPwdReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.RESET_PASSWORD_REQUEST:
			return { ...state, success: false, loading: true };
		case types.RESET_PASSWORD_SUCCESS:
			return { ...state, success: true, loading: false };
		case types.RESET_PASSWORD_ERROR:
			return { ...state, success: false, loading: false };
		default:
			return state;
	}
};

export default resetPwdReducer;
