import { createAction } from '@reduxjs/toolkit';
import {
  LOAD_MYDATA_REQUEST,
  LOAD_USER_REQUEST,
  LOG_IN_REQUEST,
  LOG_IN_RESET,
  LOG_OUT_REQUEST,
  NICKNAME_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_RESET,
  AVATAR_CHANGE_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from './action';

export const loadMyDataAction = createAction(LOAD_MYDATA_REQUEST);

export const loadUserAction = createAction(LOAD_USER_REQUEST);

export const loginAction = createAction(LOG_IN_REQUEST);
export const loginResetAction = createAction(LOG_IN_RESET);
export const logoutAction = createAction(LOG_OUT_REQUEST);

export const signupAction = createAction(SIGN_UP_REQUEST);
export const signupResetAction = createAction(SIGN_UP_RESET);

export const avatarChangeAction = createAction(AVATAR_CHANGE_REQUEST);
export const nicknameChangeAction = createAction(NICKNAME_CHANGE_REQUEST);
export const descriptionChangeAction = createAction(DESCRIPTION_CHANGE_REQUEST);

export const followAction = createAction(FOLLOW_REQUEST);
export const unfollowAction = createAction(UNFOLLOW_REQUEST);
