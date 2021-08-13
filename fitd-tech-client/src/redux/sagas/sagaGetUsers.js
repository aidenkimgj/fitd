import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { apiApplications, apiGetUsers } from '../api';
import * as types from '../constants/actionTypes';

function* getUsers(action) {
    try {
        const usersResult = yield call(apiGetUsers);
        const applicationResult = yield call(apiApplications);
        yield put({ type: types.GET_USERS_SUCCESS, payload: usersResult.data.users, applications: applicationResult.data.app });
    } catch (error) {
        yield put({ type: types.GET_USERS_FAIL, payload: error });
    }
};

function* watchGetUsers() {
    yield takeEvery(types.GET_USERS_REQUEST, getUsers);
};

export default function* sagaGetUsers() {
    yield all([fork(watchGetUsers)]);
}