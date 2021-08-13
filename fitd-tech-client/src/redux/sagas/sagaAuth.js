import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { signUp, signIn, getUserInfo, apiLogout } from '../api';
import * as types from '../constants/actionTypes';

function* signUpUser(action) {
	try {
		const result = yield call(signUp, action.payload);
		const { success, err } = result.data;
		if (success) {
			yield put({ type: types.SIGN_UP_USER_SUCCESS, payload: { success } });
		} else {
			yield put({ type: types.SIGN_UP_USER_ERROR, payload: err.name });
		}
	} catch (error) {
		yield put({ type: types.SIGN_UP_USER_ERROR, payload: error });
	}
}

function* watchSignUpUser() {
	yield takeEvery(types.SIGN_UP_USER_REQUEST, signUpUser);
}

function* signInUser(action) {
	try {
		yield call(signIn, action.payload);
		const { data } = yield call(getUserInfo, action.payload);
		if (data._id) {
			yield put({ type: types.SIGN_IN_USER_SUCCESS, payload: data });
			const history = action.history;
			history.push('/');
		} else {
			yield put({ type: types.SIGN_IN_USER_ERROR, payload: data.message });
		}
	} catch (error) {
		yield put({ type: types.SIGN_IN_USER_ERROR, payload: error });
	}
}

function* watchSignInUser() {
	yield takeEvery(types.SIGN_IN_USER_REQUEST, signInUser);
}

function* logout(action) {
	try {
		const data = yield call(apiLogout);
		const { success, err } = data.data;

		if (success) {
			yield put({ type: types.LOGOUT_SUCCESS, payload: success });
		} else {
			yield put({ type: types.LOGOUT_ERROR, payload: err });
		}
	} catch (error) {
		yield put({ type: types.LOGOUT_ERROR, payload: error });
	}
}

function* watchLogout() {
	yield takeEvery(types.LOGOUT_REQUEST, logout);
}

export default function* sagaAuth() {
	yield all([fork(watchSignUpUser), fork(watchSignInUser), fork(watchLogout)]);
}
