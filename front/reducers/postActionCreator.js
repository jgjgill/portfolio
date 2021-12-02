import { createAction } from '@reduxjs/toolkit';
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  LIKE_POST_REQUEST,
  LOAD_POSTS_REQUEST,
  REMOVE_COMMENT_REQUEST,
  REMOVE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from './action';

export const loadPostsAction = createAction(LOAD_POSTS_REQUEST);

export const addPostAction = createAction(ADD_POST_REQUEST);
export const removePostAction = createAction(REMOVE_POST_REQUEST);

export const addCommentAction = createAction(ADD_COMMENT_REQUEST);
export const removeCommentAction = createAction(REMOVE_COMMENT_REQUEST);

export const likePostAction = createAction(LIKE_POST_REQUEST);
export const unlikePostAction = createAction(UNLIKE_POST_REQUEST);
