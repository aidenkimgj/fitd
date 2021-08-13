import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { apiForgotPwd } from '../api';
import * as types from '../constants/actionTypes';

function* forgotPwd(action) {
	try {
		const result = yield call(apiForgotPwd, action.payload);
		console.log(`result`, result);
		const { success, message } = result.data;

		if (success) {
			yield put({ type: types.SEND_EMAIL_SUCCESS, payload: { success } });
		} else {
			yield put({ type: types.SEND_EMAIL_ERROR, payload: message });
		}
	} catch (error) {
		yield put({ type: types.SEND_EMAIL_ERROR, payload: error });
	}
}

function* watchForgotPwd() {
	yield takeEvery(types.SEND_EMAIL_REQUEST, forgotPwd);
}

export default function* sagaForgotPwd() {
	yield all([fork(watchForgotPwd)]);
}
