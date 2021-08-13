import * as types from '../constants/actionTypes';

const initialState = {
	error: null,
	loading: false,
};

const addUserSchedule = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_USER_SCHEDULE_REQUEST:
			return { ...state, loading: true };
		case types.ADD_USER_SCHEDULE_SUCCESS:
			return { ...state, loading: false };
		case types.ADD_USER_SCHEDULE_ERROR:
			return {
				...state,
				loading: false,
				error: 'Adding user schedule has failed!',
			};
		default:
			return state;
	}
};

export default addUserSchedule;
