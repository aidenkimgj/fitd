import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { apiAddContent } from '../api';
import * as types from '../constants/actionTypes';

function* addContent(action) {
	try {
		const result = yield call(apiAddContent, action.payload);
		const { success, error } = result.data;
		if (success) {
			yield put({ type: types.ADD_CONTENT_SUCCESS, payload: { success } });
		} else {
			yield put({ type: types.ADD_CONTENT_ERROR, payload: error.name });
		}
	} catch (error) {
		yield put({ type: types.ADD_CONTENT_ERROR, payload: error });
	}
}

function* watchAddContent() {
	yield takeEvery(types.ADD_CONTENT_REQUEST, addContent);
}

export default function* sagaAddContent() {
	yield all([fork(watchAddContent)]);
}
