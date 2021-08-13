import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { apiAddUserSchedule } from '../api';
import * as types from '../constants/actionTypes';

function* addUserSchedule(action) {
	try {
		const result = yield call(apiAddUserSchedule, action.payload);
		const { success, error } = result.data;
		if (success) {
			yield put({
				type: types.ADD_USER_SCHEDULE_SUCCESS,
				payload: { success },
			});
		} else {
			yield put({ type: types.ADD_USER_SCHEDULE_ERROR, payload: error });
		}
	} catch (error) {
		yield put({ type: types.ADD_USER_SCHEDULE_ERROR, payload: error });
	}
}

function* watchAddUserSchedule() {
	yield takeEvery(types.ADD_USER_SCHEDULE_REQUEST, addUserSchedule);
}

export default function* sagaAddUserSchedule() {
	yield all([fork(watchAddUserSchedule)]);
}
