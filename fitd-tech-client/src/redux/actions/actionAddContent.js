import * as types from '../constants/actionTypes';

const actionAddContent = (addContentObj) => {
	return {
		type: types.ADD_CONTENT_REQUEST,
		payload: addContentObj,
	};
};

export default actionAddContent;
