import { takeLatest, all, fork, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  NICKNAME_CHANGE_REQUEST,
  NICKNAME_CHANGE_SUCCESS,
  NICKNAME_CHANGE_FAILURE,
  DESCRIPTION_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_SUCCESS,
  DESCRIPTION_CHANGE_FAILURE,
  AVATAR_CHANGE_REQUEST,
  AVATAR_CHANGE_FAILURE,
  AVATAR_CHANGE_SUCCESS,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from '../reducers/action';

function loginAPI(data) {
  return axios.post('/user/login', data);
}
function* login(action) {
  try {
    yield delay(1000);
    // const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI(data) {
  return axios.post('/user/logout', data);
}
function* logout(action) {
  try {
    yield delay(1000);
    // const result = yield call(logoutAPI, action.payload);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: result.data,
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signupAPI(data) {
  return axios.post('/user/signup');
}
function* signup(action) {
  try {
    yield delay(1000);
    // const result = yield call(signupAPI, action.payload)
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function avatarChangeAPI(data) {
  return axios.post('/user/avatarChange', data);
}
function* avatarChange(action) {
  try {
    yield delay(1000);
    // const result = yield call(avatarChangeAPI, action.payload);
    yield put({
      type: AVATAR_CHANGE_SUCCESS,
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AVATAR_CHANGE_FAILURE,
      error: err.response.data,
    });
  }
}

function nicknameChangeAPI(data) {
  return axios.post('/user/nicknameChange', data);
}
function* nicknameChange(action) {
  try {
    yield delay(1000);
    // const result = yield call(nicknameChangeAPI, action.payload);
    yield put({
      type: NICKNAME_CHANGE_SUCCESS,
      // data: result.data,
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NICKNAME_CHANGE_FAILURE,
      error: err.response.data,
    });
  }
}

function descriptionChangeAPI(data) {
  return axios.post('/user/descriptionChange', data);
}
function* descriptionChange(action) {
  try {
    yield delay(1000);
    // const result = yield call(descriptionChangeAPI, action.payload);
    yield put({
      type: DESCRIPTION_CHANGE_SUCCESS,
      // data: result.data,
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DESCRIPTION_CHANGE_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.post('user/follow', data);
}
function* follow(action) {
  try {
    yield delay(1000);
    // const result = yield call(followAPI, action.payload);
    yield put({
      type: FOLLOW_SUCCESS,
      // data: result.data
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.post('user/unfollow', data);
}
function* unfollow(action) {
  try {
    yield delay(1000);
    // const result = yield call(unfollowAPI, action.payload);
    yield put({
      type: UNFOLLOW_SUCCESS,
      // data: result.data
      data: action.payload,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* watchAvatarChange() {
  yield takeLatest(AVATAR_CHANGE_REQUEST, avatarChange);
}
function* watchNicknameChange() {
  yield takeLatest(NICKNAME_CHANGE_REQUEST, nicknameChange);
}
function* watchDescriptionChange() {
  yield takeLatest(DESCRIPTION_CHANGE_REQUEST, descriptionChange);
}
function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAvatarChange),
    fork(watchNicknameChange),
    fork(watchDescriptionChange),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
