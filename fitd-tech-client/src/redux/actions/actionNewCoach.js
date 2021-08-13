import * as types from '../constants/actionTypes';

const actionNewCoach = (newCoachObj) => {
	return {
		type: types.NEW_COACH_REQUEST,
		payload: newCoachObj,
	};
};

export default actionNewCoach;
