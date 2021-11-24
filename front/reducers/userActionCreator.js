import { createAction } from '@reduxjs/toolkit';
import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  NICKNAME_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_REQUEST,
  SIGN_UP_REQUEST,
  AVATAR_CHANGE_REQUEST,
  SIGN_UP_DONE_RESET,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from './action';

export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const logoutRequestAction = createAction(LOG_OUT_REQUEST);

export const signupAction = createAction(SIGN_UP_REQUEST);
export const signUpDoneRestAction = createAction(SIGN_UP_DONE_RESET);

export const avatarChangeAction = createAction(AVATAR_CHANGE_REQUEST);
export const nicknameChangeAction = createAction(NICKNAME_CHANGE_REQUEST);
export const descriptionChangeAction = createAction(DESCRIPTION_CHANGE_REQUEST);

export const followRequestAction = createAction(FOLLOW_REQUEST);
export const unfollowRequestAction = createAction(UNFOLLOW_REQUEST);
