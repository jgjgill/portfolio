import { createAction } from '@reduxjs/toolkit';
import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  NICKNAME_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_RESET,
  AVATAR_CHANGE_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  LOAD_MYDATA_REQUEST,
} from './action';

export const loadMyDataAction = createAction(LOAD_MYDATA_REQUEST);

export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const logoutRequestAction = createAction(LOG_OUT_REQUEST);

export const signupAction = createAction(SIGN_UP_REQUEST);
export const signupRestAction = createAction(SIGN_UP_RESET);

export const avatarChangeAction = createAction(AVATAR_CHANGE_REQUEST);
export const nicknameChangeAction = createAction(NICKNAME_CHANGE_REQUEST);
export const descriptionChangeAction = createAction(DESCRIPTION_CHANGE_REQUEST);

export const followRequestAction = createAction(FOLLOW_REQUEST);
export const unfollowRequestAction = createAction(UNFOLLOW_REQUEST);
