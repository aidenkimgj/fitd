import * as types from '../constants/actionTypes';

const actionForgotPwd = (email) => {
	return {
		type: types.SEND_EMAIL_REQUEST,
		payload: email,
	};
};

export default actionForgotPwd;
