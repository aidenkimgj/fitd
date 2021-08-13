import * as types from '../constants/actionTypes';

const initialState = {
	error: null,
	loading: false,
};

const newCoachReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.NEW_COACH_REQUEST:
			return { ...state, loading: true };
		case types.NEW_COACH_SUCCESS:
			return { ...state, loading: false };
		case types.NEW_COACH_ERROR:
			return {
				...state,
				loading: false,
				error: 'New coach registration has failed!',
			};
		default:
			return state;
	}
};

export default newCoachReducer;
