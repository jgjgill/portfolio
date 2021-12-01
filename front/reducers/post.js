import shortid from 'shortid';
import { createReducer } from '@reduxjs/toolkit';
import faker from 'faker';
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from './action';
import postState from './postState';

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
    avatarNumber: faker.datatype.number(),
  },
  content: faker.lorem.paragraph(),
  rateNumber: Math.random() * 5,
  Images: [{ src: faker.image.image() }, { src: faker.image.image() }],
  Comments: [],
}));

const dummyComment = (data) => ({
  User: {
    id: data.myDataId,
    nickname: 'zzzzzzzzzz',
    avatarNumber: 40,
  },
  commentId: shortid.generate(),
  content: data.commentText,
});

const reducer = createReducer(postState, (builder) => {
  builder
    .addCase(LOAD_POSTS_REQUEST, (state) => {
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
    })
    .addCase(LOAD_POSTS_SUCCESS, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.data);
      state.hasMorePosts = state.mainPosts.length < 50;
    })
    .addCase(LOAD_POSTS_FAILURE, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    })

    .addCase(ADD_POST_REQUEST, (state) => {
      state.addPostLoading = true;
      state.addPostDone = false;
    })
    .addCase(ADD_POST_SUCCESS, (state, action) => {
      // data.postData
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts.unshift(action.data);
    })
    .addCase(ADD_POST_FAILURE, (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.error;
    })

    .addCase(REMOVE_POST_REQUEST, (state) => {
      state.removePostLoading = true;
      state.removePostDone = false;
    })
    .addCase(REMOVE_POST_SUCCESS, (state, action) => {
      state.removePostLoading = false;
      state.removePostDone = true;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== action.data.postId);
    })
    .addCase(REMOVE_POST_FAILURE, (state, action) => {
      state.removePostLoading = false;
      state.removePostError = action.error;
    })

    .addCase(ADD_COMMENT_REQUEST, (state) => {
      state.addCommentLoading = true;
      state.addCommentDone = false;
    })
    .addCase(ADD_COMMENT_SUCCESS, (state, action) => {
      // data.content, data.PostId, data.UserId
      // data.commentData
      const post = state.mainPosts.find((v) => v.id === action.data.PostId);
      state.addCommentLoading = false;
      state.addCommentDone = true;
      post.Comments.unshift(action.data);
    })
    .addCase(ADD_COMMENT_FAILURE, (state, action) => {
      state.addCommentLoading = false;
      state.addCommentError = action.error;
    })

    .addCase(REMOVE_COMMENT_REQUEST, (state) => {
      state.removeCommentLoading = true;
      state.removeCommentDone = false;
    })
    .addCase(REMOVE_COMMENT_SUCCESS, (state, action) => {
      // data.postId, data.commentId
      const post = state.mainPosts.find((v) => v.id === action.data.postId);
      state.removeCommentLoading = false;
      state.removeCommentDone = true;
      post.Comments = post.Comments.filter(
        (v) => v.commentId !== action.data.commentId,
      );
    })
    .addCase(REMOVE_COMMENT_FAILURE, (state, action) => {
      state.removeCommentLoading = false;
      state.removeCommentError = action.error;
    });
});

export default reducer;
