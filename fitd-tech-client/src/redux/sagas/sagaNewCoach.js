import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { apiNewCoach } from '../api';
import * as types from '../constants/actionTypes';

function* newCoach(action) {
	console.log(`action.payload`, action.payload);
	try {
		const result = yield call(apiNewCoach, action.payload);
		//console.log(`result`, result)
		const { success, error } = result.data;
		if (success) {
			yield put({ type: types.NEW_COACH_SUCCESS, payload: { success } });
		} else {
			console.log(`error`);
			yield put({ type: types.NEW_COACH_ERROR, payload: error.name });
		}
	} catch (error) {
		console.log(`error`, error);
		yield put({ type: types.NEW_COACH_ERROR, payload: error });
	}
}

function* watchNewCoach() {
	yield takeEvery(types.NEW_COACH_REQUEST, newCoach);
}

export default function* sagaNewCoach() {
	yield all([fork(watchNewCoach)]);
}
