import * as types from '../constants/actionTypes';

const actionNameError = () => {
	return {
		type: types.NAME_VALIDATE_ERROR,
		payload: 'Your name must be letters',
	};
};

export default actionNameError;
