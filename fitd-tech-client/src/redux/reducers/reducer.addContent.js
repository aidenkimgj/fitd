import * as types from '../constants/actionTypes';

const initialState = {
	error: null,
	loading: false,
};

const addContentReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_CONTENT_REQUEST:
			return { ...state, loading: true };
		case types.ADD_CONTENT_SUCCESS:
			return { ...state, loading: false };
		case types.ADD_CONTENT_ERROR:
			return {
				...state,
				loading: false,
				error: 'Add content registration has failed!',
			};
		default:
			return state;
	}
};

export default addContentReducer;
