import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { apiGetCoaches } from '../api';
import * as types from '../constants/actionTypes';

function* getCoaches(action) {
    try {
        const coachesResult = yield call(apiGetCoaches);
        yield put({ type: types.GET_COACHES_SUCCESS, payload: coachesResult.data.coach });
    } catch (error) {
        yield put({ type: types.GET_COACHES_FAIL, payload: error });
    }
};

function* watchGetCoaches() {
    yield takeEvery(types.GET_COACHES_REQUEST, getCoaches);
};

export default function* sagaGetCoaches() {
    yield all([fork(watchGetCoaches)]);
}