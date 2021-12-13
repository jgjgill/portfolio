import { takeLatest, all, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MYDATA_REQUEST,
  LOAD_MYDATA_SUCCESS,
  LOAD_MYDATA_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
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
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  REMOVE_FOLLOW_REQUEST,
  REMOVE_FOLLOW_SUCCESS,
  REMOVE_FOLLOW_FAILURE,

} from '../reducers/action';

function loadMydataAPI() {
  return axios.get('/user/mydata');
}
function* loadMydata() {
  // userData
  try {
    const result = yield call(loadMydataAPI);
    yield put({
      type: LOAD_MYDATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MYDATA_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserAPI(data) {
  console.log(data);
  return axios.get(`/user/${data.userId}`);
}
function* loadUser(action) {
  // data
  try {
    const result = yield call(loadUserAPI, action.payload);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post('/user/login', data);
}
function* login(action) {
  // username, password -> userData
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}
function* logout() {
  try {
    const result = yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
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
  return axios.post('/user/signup', data);
}
function* signup(action) {
  // username, nickname, password
  try {
    const result = yield call(signupAPI, action.payload);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
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
  return axios.patch('/user/avatarChange', data);
}
function* avatarChange(action) {
  // myAvatar -> avatarNumber
  try {
    const result = yield call(avatarChangeAPI, action.payload);
    yield put({
      type: AVATAR_CHANGE_SUCCESS,
      data: result.data,
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
  return axios.patch('/user/nicknameChange', data);
}
function* nicknameChange(action) {
  // nickname
  try {
    const result = yield call(nicknameChangeAPI, action.payload);
    yield put({
      type: NICKNAME_CHANGE_SUCCESS,
      data: result.data,
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
  return axios.patch('/user/descriptionChange', data);
}
function* descriptionChange(action) {
  // description
  try {
    const result = yield call(descriptionChangeAPI, action.payload);
    yield put({
      type: DESCRIPTION_CHANGE_SUCCESS,
      data: result.data,
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
  return axios.patch(`user/${data.userId}/follow`);
}
function* follow(action) {
  // userId, userNickname
  try {
    const result = yield call(followAPI, action.payload);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
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
  return axios.delete(`user/${data.userId}/unfollow`);
}
function* unfollow(action) {
  // userId
  try {
    const result = yield call(unfollowAPI, action.payload);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowAPI(data) {
  return axios.delete(`user/${data.userId}/remove/follow`);
}
function* removeFollow(action) {
  // userId
  try {
    const result = yield call(removeFollowAPI, action.payload);
    yield put({
      type: REMOVE_FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMydata() {
  yield takeLatest(LOAD_MYDATA_REQUEST, loadMydata);
}
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
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
function* watchRemoveFollow() {
  yield takeLatest(REMOVE_FOLLOW_REQUEST, removeFollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMydata),
    fork(watchLoadUser),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAvatarChange),
    fork(watchNicknameChange),
    fork(watchDescriptionChange),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchRemoveFollow),
  ]);
}
