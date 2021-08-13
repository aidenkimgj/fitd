import * as types from '../constants/actionTypes';

const initialState = {
	loading: false,
};

const forgotPwdReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SEND_EMAIL_REQUEST:
			return { ...state, loading: true };
		case types.SEND_EMAIL_SUCCESS:
			return { ...state, success: true, loading: false };
		case types.SEND_EMAIL_ERROR:
			return { ...state, success: false, loading: false, err: action.payload };
		default:
			return state;
	}
};

export default forgotPwdReducer;
