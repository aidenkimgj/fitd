import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { apiResetPwd } from '../api';
import * as types from '../constants/actionTypes';

function* resetPwd(action) {
	try {
		const result = yield call(apiResetPwd, action.payload);
		console.log(`result`, result);
		yield put({ type: types.RESET_PASSWORD_SUCCESS, payload: result });
	} catch (error) {
		yield put({ type: types.RESET_PASSWORD_ERROR, payload: error });
	}
}

function* watchResetPwd() {
	yield takeEvery(types.RESET_PASSWORD_REQUEST, resetPwd);
}

export default function* sagaResetPwd() {
	yield all([fork(watchResetPwd)]);
}
