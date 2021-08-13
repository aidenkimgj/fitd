import { combineReducers } from 'redux';
import authReducer from './reducer.auth';
import forgotPwdReducer from './reducer.forgotPwd';
import resetPwdReducer from './reducer.resetPwd';
import newCoachReducer from './reducer.newCoach';
import getUsersReducer from './reducer.getUsers';
import getCoachesReducer from './reducer.getCoaches';
import approveApplicationReducer from './reducer.ApproveApplication';
import addContentReducer from './reducer.addContent';
import addUserSchedule from './reducer.addUserSchedule';

const rootReducer = combineReducers({
	authReducer,
	forgotPwdReducer,
	resetPwdReducer,
	newCoachReducer,
	getUsersReducer,
	getCoachesReducer,
	approveApplicationReducer,
	addContentReducer,
	addUserSchedule,
});

export default rootReducer;
