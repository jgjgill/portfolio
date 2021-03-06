import { createReducer } from '@reduxjs/toolkit';
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
  LOG_IN_RESET,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_RESET,
  AVATAR_CHANGE_REQUEST,
  AVATAR_CHANGE_SUCCESS,
  AVATAR_CHANGE_FAILURE,
  NICKNAME_CHANGE_REQUEST,
  NICKNAME_CHANGE_SUCCESS,
  NICKNAME_CHANGE_FAILURE,
  DESCRIPTION_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_SUCCESS,
  DESCRIPTION_CHANGE_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  REMOVE_FOLLOW_REQUEST,
  REMOVE_FOLLOW_SUCCESS,
  REMOVE_FOLLOW_FAILURE,

} from './action';
import userState from './userState';

const reducer = createReducer(userState, (builder) => {
  builder
    .addCase(LOAD_MYDATA_REQUEST, (state) => {
      state.loadMydataLoading = true;
      state.loadMydataDone = false;
    })
    .addCase(LOAD_MYDATA_SUCCESS, (state, action) => {
      // data.userData
      state.loadMydataLoading = false;
      state.loadMydataDone = true;
      state.myData = action.data;
    })
    .addCase(LOAD_MYDATA_FAILURE, (state, action) => {
      state.loadMydataLoading = false;
      state.loadMydataError = action.error;
    })

    .addCase(LOAD_USER_REQUEST, (state) => {
      state.loadUserLoading = true;
      state.loadUserDone = false;
    })
    .addCase(LOAD_USER_SUCCESS, (state, action) => {
      // data.userData
      state.loadUserLoading = false;
      state.loadUserDone = true;
      state.userInfo = action.data;
    })
    .addCase(LOAD_USER_FAILURE, (state, action) => {
      state.loadUserLoading = false;
      state.loadUserError = action.error;
    })

    .addCase(LOG_IN_REQUEST, (state) => {
      state.loginLoading = true;
    })
    .addCase(LOG_IN_SUCCESS, (state, action) => {
      // data.userData
      state.loginLoading = false;
      state.isLoggedIn = true;
      state.loginState = true;
      state.logoutState = false;
      state.myData = action.data;
    })
    .addCase(LOG_IN_FAILURE, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.error;
    })

    .addCase(LOG_IN_RESET, (state) => {
      state.loginLoading = false;
      state.loginError = null;
    })

    .addCase(LOG_OUT_REQUEST, (state) => {
      state.logoutLoading = true;
    })
    .addCase(LOG_OUT_SUCCESS, (state, action) => {
      // data.'LOGOUT'
      state.logoutLoading = false;
      state.isLoggedIn = false;
      state.logoutState = action.data;
      state.loginState = false;
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
    .addCase(SIGN_UP_SUCCESS, (state) => {
      state.signupLoading = false;
      state.signupDone = true;
    })
    .addCase(SIGN_UP_FAILURE, (state, action) => {
      state.signupLoading = false;
      state.signupError = action.error;
    })

    .addCase(SIGN_UP_RESET, (state) => {
      state.signupDone = false;
      state.signupError = null;
    })

    .addCase(AVATAR_CHANGE_REQUEST, (state) => {
      state.changeAvatarLoading = true;
      state.changeAvatarDone = false;
    })
    .addCase(AVATAR_CHANGE_SUCCESS, (state, action) => {
      // data.avatarNumber
      state.changeAvatarLoading = false;
      state.changeAvatarDone = true;
      state.myData.avatarNumber = action.data.avatarNumber;
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
      // data.nickname
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
      // data.description
      state.changeDescriptionLoading = false;
      state.changeDescriptionDone = true;
      state.myData.description = action.data.description;
    })
    .addCase(DESCRIPTION_CHANGE_FAILURE, (state, action) => {
      state.changeDescriptionLoading = false;
      state.changeDescriptionError = action.error;
    })

    .addCase(FOLLOW_REQUEST, (state) => {
      state.followLoading = true;
      state.followDone = false;
    })
    .addCase(FOLLOW_SUCCESS, (state, action) => {
      // data.userId, data.userNickname
      state.followLoading = false;
      state.followDone = true;
      state.myData.Following.push({ id: action.data.userId, nickname: action.data.userNickname });
    })
    .addCase(FOLLOW_FAILURE, (state, action) => {
      state.followLoading = false;
      state.followError = action.error;
    })

    .addCase(UNFOLLOW_REQUEST, (state) => {
      state.unfollowLoading = true;
      state.unfollowDone = false;
    })
    .addCase(UNFOLLOW_SUCCESS, (state, action) => {
      // data.userId
      state.unfollowLoading = false;
      state.unfollowDone = true;
      state.myData.Following = state.myData.Following.filter((v) => v.id !== action.data.userId);
    })
    .addCase(UNFOLLOW_FAILURE, (state, action) => {
      state.unfollowLoading = false;
      state.unfollowError = action.error;
    })

    .addCase(REMOVE_FOLLOW_REQUEST, (state) => {
      state.removeFollowLoading = true;
      state.removeFollowDone = false;
    })
    .addCase(REMOVE_FOLLOW_SUCCESS, (state, action) => {
      state.removeFollowLoading = false;
      state.removeFollowDone = true;
      state.myData.Follower = state.myData.Follower.filter((v) => v.id !== action.data.userId);
    })
    .addCase(REMOVE_FOLLOW_FAILURE, (state, action) => {
      state.removeFollowLoading = false;
      state.removeFollowError = action.error;
    });
});

export default reducer;
