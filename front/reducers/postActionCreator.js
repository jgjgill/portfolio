import { createAction } from '@reduxjs/toolkit';
import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST } from './action';

export const addPostAction = createAction(ADD_POST_REQUEST);

export const addCommentAction = createAction(ADD_COMMENT_REQUEST);
