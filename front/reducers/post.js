import { createReducer } from '@reduxjs/toolkit';
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_RATE_POSTS_REQUEST,
  LOAD_RATE_POSTS_SUCCESS,
  LOAD_RATE_POSTS_FAILURE,
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
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE,
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  RETWEET_POST_FAILURE,
  RETWEET_POST_RESET,
} from './action';
import postState from './postState';

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
      state.hasMorePosts = action.data.length === 10;
    })
    .addCase(LOAD_POSTS_FAILURE, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    })

    .addCase(LOAD_POST_REQUEST, (state) => {
      state.loadPostLoading = true;
      state.loadPostDone = false;
    })
    .addCase(LOAD_POST_SUCCESS, (state, action) => {
      state.loadPostLoading = false;
      state.loadPostDone = true;
      state.mainPosts.push(action.data);
    })
    .addCase(LOAD_POST_FAILURE, (state, action) => {
      state.loadPostLoading = false;
      state.loadPostError = action.error;
    })

    .addCase(LOAD_USER_POSTS_REQUEST, (state) => {
      state.loadUserPostsLoading = true;
      state.loadUserPostsDone = false;
    })
    .addCase(LOAD_USER_POSTS_SUCCESS, (state, action) => {
      state.loadUserPostsLoading = false;
      state.loadUserPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.data);
      state.hasMorePosts = action.data.length === 10;
    })
    .addCase(LOAD_USER_POSTS_FAILURE, (state, action) => {
      state.loadUserPostsLoading = false;
      state.loadUserPostsError = action.error;
    })

    .addCase(LOAD_HASHTAG_POSTS_REQUEST, (state) => {
      state.loadHashtagPostsLoading = true;
      state.loadHashtagPostsDone = false;
    })
    .addCase(LOAD_HASHTAG_POSTS_SUCCESS, (state, action) => {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.data);
      state.hasMorePosts = action.data.length === 10;
    })
    .addCase(LOAD_HASHTAG_POSTS_FAILURE, (state, action) => {
      state.loadHashtagPostsLoading = false;
      state.loadHashtagPostsError = action.error;
    })

    .addCase(LOAD_RATE_POSTS_REQUEST, (state) => {
      state.loadRatePostsLoading = true;
      state.loadRatePostsDone = false;
    })
    .addCase(LOAD_RATE_POSTS_SUCCESS, (state, action) => {
      state.loadRatePostsLoading = false;
      state.loadRatePostsDone = true;
      state.mainPosts = state.mainPosts.concat(action.data);
      state.hasMorePosts = action.data.length === 10;
    })
    .addCase(LOAD_RATE_POSTS_FAILURE, (state, action) => {
      state.loadRatePostsLoading = false;
      state.loadRatePostsError = action.error;
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
      state.imagePaths = [];
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
      // data.postId
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
        (v) => v.id !== action.data.commentId,
      );
    })
    .addCase(REMOVE_COMMENT_FAILURE, (state, action) => {
      state.removeCommentLoading = false;
      state.removeCommentError = action.error;
    })

    .addCase(LIKE_POST_REQUEST, (state) => {
      state.likePostLoading = true;
      state.likePostDone = false;
    })
    .addCase(LIKE_POST_SUCCESS, (state, action) => {
      // data.postId, data.UserId
      const post = state.mainPosts.find((v) => v.id === action.data.postId);
      state.likePostLoading = false;
      state.likePostDone = true;
      post.Liker.push({ id: action.data.UserId });
    })
    .addCase(LIKE_POST_FAILURE, (state, action) => {
      state.likePostLoading = false;
      state.likePostError = action.error;
    })

    .addCase(UNLIKE_POST_REQUEST, (state) => {
      state.unlikePostLoading = true;
      state.unlikePostDone = false;
    })
    .addCase(UNLIKE_POST_SUCCESS, ((state, action) => {
      // data.postId, data.userId
      const post = state.mainPosts.find((v) => v.id === action.data.postId);
      state.unlikePostLoading = false;
      state.unlikePostDone = true;
      post.Liker = post.Liker.filter((v) => v.id !== action.data.userId);
    }))
    .addCase(UNLIKE_POST_FAILURE, ((state, action) => {
      state.unlikePostLoading = false;
      state.unlikePostLoading = action.error;
    }))

    .addCase(UPLOAD_IMAGES_REQUEST, (state) => {
      state.uploadImagesLoading = true;
      state.uploadImagesDone = false;
    })
    .addCase(UPLOAD_IMAGES_SUCCESS, ((state, action) => {
      // data
      state.uploadImagesLoading = false;
      state.uploadImagesDone = true;
      state.imagePaths.unshift(action.data);
    }))
    .addCase(UPLOAD_IMAGES_FAILURE, ((state, action) => {
      state.uploadImagesLoading = false;
      state.uploadImagesError = action.error;
    }))

    .addCase(REMOVE_IMAGE, (state, action) => {
      state.imagePaths = state.imagePaths.filter((_, i) => i !== action.payload);
    })

    .addCase(RETWEET_POST_REQUEST, (state) => {
      state.retweetPostLoading = true;
      state.retweetPostDone = false;
    })
    .addCase(RETWEET_POST_SUCCESS, (state, action) => {
      // data.retweetWithPrevPost
      state.retweetPostLoading = false;
      state.retweetPostDone = true;
      state.mainPosts.unshift(action.data);
    })
    .addCase(RETWEET_POST_FAILURE, (state, action) => {
      state.retweetPostLoading = false;
      state.retweetPostError = action.error;
    })

    .addCase(RETWEET_POST_RESET, (state) => {
      state.retweetPostLoading = false;
      state.retweetPostError = null;
    });
});

export default reducer;
