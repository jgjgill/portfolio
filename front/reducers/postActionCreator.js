import { ADD_COMMENT_REQUEST, ADD_POST_REQUEST } from './action';

export const addPostAction = (data) => {
  console.log('addpostData: ');
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const addCommentAction = (data) => {
  console.log('commentData: ', data);
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};
