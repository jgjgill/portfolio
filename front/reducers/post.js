import shortid from 'shortid';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from './action';

const dummyData = {
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
          content: 'wowwowow',
        },
        {
          User: {
            nickname: 'momomomo',
            avatarNumber: 45,
          },
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

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
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
    nickname: 'kokokokoko',
    avatarNumber: 40,
  },
  content: data.commentText,
});

// const initialState = {};

const reducer = (state = dummyData, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
      };
    case ADD_COMMENT_SUCCESS:
      // data.commentText, data.postId, data.myDataId
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
