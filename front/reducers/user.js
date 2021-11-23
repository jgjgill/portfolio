import { createReducer } from '@reduxjs/toolkit';
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
  AVATAR_CHANGE_REQUEST,
  AVATAR_CHANGE_SUCCESS,
  AVATAR_CHANGE_FAILURE,
  NICKNAME_CHANGE_REQUEST,
  NICKNAME_CHANGE_SUCCESS,
  NICKNAME_CHANGE_FAILURE,
  DESCRIPTION_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_SUCCESS,
  DESCRIPTION_CHANGE_FAILURE,

} from './action';

const initialState = {
  loginLoading: false,
  loginError: null,

  logoutLoading: false,
  logoutError: null,

  isLoggedIn: false,

  signupLoading: false,
  signupDone: false,
  signupError: null,

  changeAvatarLoading: false,
  changeAvatarDone: false,
  changeAvatarError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  changeDescriptionLoading: false,
  changeDescriptionDone: false,
  changeDescriptionError: null,

  myData: {
    id: null,
    avatarNumber: 20,
    nickname: null,
    description: null,
  },
};

const dummyUser = (data) => ({
  id: data.id,
  avatarNumber: 70,
  nickname: 'first_people',
  description: 'my first description',
  Posts: [1, 2],
  Followers: ['gil', 'jgjg2', 'jjj'],
  Followings: ['jgjg1', 'jgjg2'],
});

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOG_IN_REQUEST, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
    })
    .addCase(LOG_IN_SUCCESS, (state, action) => {
      state.loginLoading = false;
      state.isLoggedIn = true;
      state.myData = dummyUser(action.data);
    })
    .addCase(LOG_IN_FAILURE, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.error;
    })

    .addCase(LOG_OUT_REQUEST, (state) => {
      state.logoutLoading = true;
      state.logoutDone = false;
    })
    .addCase(LOG_OUT_SUCCESS, (state) => {
      state.logoutLoading = false;
      state.isLoggedIn = false;
      state.myData = null;
    })
    .addCase(LOG_OUT_FAILURE, (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.error;
    })

    .addCase(SIGN_UP_REQUEST, (state) => {
      state.signupLoading = true;
      state.signupDone = false;
    })
    .addCase(SIGN_UP_SUCCESS, (state, action) => {
      state.signupLoading = false;
      state.signupDone = true;
    })
    .addCase(SIGN_UP_FAILURE, (state, action) => {
      state.signupLoading = false;
      state.signupError = action.error;
    })

    .addCase(AVATAR_CHANGE_REQUEST, (state) => {
      state.changeAvatarLoading = true;
      state.changeAvatarDone = false;
    })
    .addCase(AVATAR_CHANGE_SUCCESS, (state, action) => {
      state.changeAvatarLoading = false;
      state.changeAvatarDone = true;
      state.myData.avatarNumber = action.data.myAvatar;
    })
    .addCase(AVATAR_CHANGE_FAILURE, (state, action) => {
      state.changeAvatarLoading = false;
      state.changeAvatarError = action.error;
    })

    .addCase(NICKNAME_CHANGE_REQUEST, (state) => {
      state.changeNicknameLoading = true;
      state.changeNicknameDone = false;
    })
    .addCase(NICKNAME_CHANGE_SUCCESS, (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameDone = true;
      state.myData.nickname = action.data.nickname;
    })
    .addCase(NICKNAME_CHANGE_FAILURE, (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.error;
    })

    .addCase(DESCRIPTION_CHANGE_REQUEST, (state) => {
      state.changeDescriptionLoading = true;
      state.changeDescriptionDone = false;
    })
    .addCase(DESCRIPTION_CHANGE_SUCCESS, (state, action) => {
      state.changeDescriptionLoading = false;
      state.changeDescriptionDone = true;
      state.myData.description = action.data.description;
    })
    .addCase(DESCRIPTION_CHANGE_FAILURE, (state, action) => {
      state.changeDescriptionLoading = false;
      state.changeDescriptionError = action.error;
    });
});

export default reducer;
