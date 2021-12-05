const postState = {
  mainPosts: [],
  imagePaths: [],

  hasMorePosts: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

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

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  retweetPostLoading: false,
  retweetPostDone: false,
  retweetPostError: null,

};

export default postState;
