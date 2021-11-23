import { createAction } from '@reduxjs/toolkit';
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  REMOVE_COMMENT_REQUEST,
  REMOVE_POST_REQUEST,
} from './action';

export const addPostAction = createAction(ADD_POST_REQUEST);
export const removePostAction = createAction(REMOVE_POST_REQUEST);

export const addCommentAction = createAction(ADD_COMMENT_REQUEST);
export const removeCommentAction = createAction(REMOVE_COMMENT_REQUEST);
