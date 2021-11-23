import shortid from 'shortid';
import { createReducer } from '@reduxjs/toolkit';
import {
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

const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: '1',
        nickname: 'jgjgjg',
        avatarNumber: 30,
      },
      content: '첫 번째 게시글! #start',
      rateNumber: 4,
      Images: [
        {
          src: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        },
        {
          src: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        },
        {
          src: 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
        },
      ],
      Comments: [
        {
          User: {
            id: 2,
            nickname: 'kokokokoko',
            avatarNumber: 40,
          },
          commentId: 2,
          content: 'wowwowow',
        },
        {
          User: {
            id: 1,
            nickname: 'momomomo',
            avatarNumber: 45,
          },
          commentId: 1,
          content: 'kikikiki',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
};

const dummyPost = (data) => ({
  id: shortid.generate(),
  User: {
    id: 2,
    nickname: 'secondpeople',
  },
  content: data.postText,
  rateNumber: data.rateValue,
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  User: {
    id: data.myDataId,
    nickname: 'zzzzzzzzzz',
    avatarNumber: 40,
  },
  commentId: shortid.generate(),
  content: data.commentText,
});

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_POST_REQUEST, (state) => {
      state.addPostLoading = true;
      state.addPostDone = false;
    })
    .addCase(ADD_POST_SUCCESS, (state, action) => {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.mainPosts.unshift(dummyPost(action.data));
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
      // data.commentText, data.postId, data.myDataId
      const post = state.mainPosts.find((v) => v.id === action.data.postId);
      state.addCommentLoading = false;
      state.addCommentDone = true;
      post.Comments.unshift(dummyComment(action.data));
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
