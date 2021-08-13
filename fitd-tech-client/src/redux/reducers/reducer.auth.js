import * as types from '../constants/actionTypes';

const initialState = {
	authData: null,
	loading: false,
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGN_UP_USER_REQUEST:
			return { ...state, loading: true };
		case types.SIGN_UP_USER_SUCCESS:
			return { ...state, authData: action.payload, loading: false };
		case types.SIGN_UP_USER_ERROR:
			return { ...state, err: 'User already existed', loading: false };
		case types.SIGN_IN_USER_REQUEST:
			return { ...state, loading: true };
		case types.SIGN_IN_USER_SUCCESS:
			localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
			sessionStorage.setItem('profile', JSON.stringify({ ...action.payload }));
			return { ...state, authData: action.payload, loading: false };
		case types.SIGN_IN_USER_ERROR:
			return { ...state, err: action.payload, loading: false };
		case types.NAME_VALIDATE_ERROR:
			return { ...state, err: action.payload };
		case types.CLEAR_STORE:
			return { ...initialState };
		case types.LOGOUT_REQUEST:
			return { ...state, loading: true };
		case types.LOGOUT_SUCCESS:
			localStorage.removeItem('profile', JSON.stringify({ ...action.payload }));
			sessionStorage.removeItem(
				'profile',
				JSON.stringify({ ...action.payload })
			);
			return {};
		case types.LOGOUT_ERROR:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default authReducer;
