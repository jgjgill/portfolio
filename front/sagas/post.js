import { takeLatest, all, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
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
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
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
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  RETWEET_POST_FAILURE,
} from '../reducers/action';

function loadPostsAPI(data) {
  return axios.get(`/posts?lastId=${data?.lastId || 0}`);
}
function* loadPosts(action) {
  // lastId
  try {
    const result = yield call(loadPostsAPI, action.payload);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data.postId}`);
}
function* loadPost(action) {
  // postData
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserPostsAPI(data) {
  return axios.get(`/posts/user/${data.userId}?lastId=${data?.lastId || 0}`);
}
function* loadUserPosts(action) {
  //
  try {
    const result = yield call(loadUserPostsAPI, action.payload);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadHashtagPostsAPI(data) {
  return axios.get(`/posts/hashtag/${encodeURIComponent(data.hashtagName)}?lastId=${data?.lastId || 0}`);
}
function* loadHashtagPosts(action) {
  //
  try {
    const result = yield call(loadHashtagPostsAPI, action.payload);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post/addPost', data);
}
function* addPost(action) {
  // postTitle-> title ,postText -> content, image, rateNumber, UserId
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data.postId}/removePost`);
}
function* removePost(action) {
  // postId
  try {
    const result = yield call(removePostAPI, action.payload);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/addComment`, data);
}
function* addComment(action) {
  // commentText -> content, postId -> PostId, UserId
  try {
    const result = yield call(addCommentAPI, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete(`/post/${data.postId}/${data.commentId}/removeComment`);
}
function* removeComment(action) {
  // postId, commentId
  try {
    const result = yield call(removeCommentAPI, action.payload);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch('/post/likePost', data);
}
function* likePost(action) {
  // postId, UserId
  try {
    const result = yield call(likePostAPI, action.payload);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data.postId}/unlikePost`);
}
function* unlikePost(action) {
  // postId, userId
  try {
    const result = yield call(unlikePostAPI, action.payload);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/uploadImages', data);
}
function* uploadImages(action) {
  // imageFormData -> data
  try {
    const result = yield call(uploadImagesAPI, action.payload);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function retweetPostAPI(data) {
  return axios.post(`/post/${data.postId}/retweetPost`, data);
}
function* retweetPost(action) {
  // retweetWithPrevPost
  try {
    const result = yield call(retweetPostAPI, action.payload);
    yield put({
      type: RETWEET_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* wathchRetweetPost() {
  yield takeLatest(RETWEET_POST_REQUEST, retweetPost);
}

export default function* postSaga() {
  yield all(
    [
      fork(watchLoadPosts),
      fork(watchLoadPost),
      fork(watchLoadUserPosts),
      fork(watchLoadHashtagPosts),
      fork(watchAddPost),
      fork(watchRemovePost),
      fork(watchAddComment),
      fork(watchRemoveComment),
      fork(watchLikePost),
      fork(watchUnlikePost),
      fork(watchUploadImage),
      fork(wathchRetweetPost),
    ],
  );
}
