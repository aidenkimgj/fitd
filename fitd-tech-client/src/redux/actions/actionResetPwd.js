import * as types from '../constants/actionTypes';

const actionResetPwd = (password, token) => {
	return {
		type: types.RESET_PASSWORD_REQUEST,
		payload: { password, token },
	};
};

export default actionResetPwd;
