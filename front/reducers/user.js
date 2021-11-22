import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  AVATAR_CHANGE_REQUEST,
  AVATAR_CHANGE_SUCCESS,
  AVATAR_CHANGE_FAILURE,
  NICKNAME_CHANGE_REQUEST,
  NICKNAME_CHANGE_SUCCESS,
  NICKNAME_CHANGE_FAILURE,
  DESCRIPTION_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_SUCCESS,
  DESCRIPTION_CHANGE_FAILURE,

} from './action';

const initialState = {
  loginLoading: false,
  loginError: null,

  logoutLoading: false,
  logoutError: null,

  isLoggedIn: false,

  signupLoading: false,
  signupDoen: false,
  signupError: null,

  changeAvatarLoading: false,
  changeAvatarDone: false,
  changeAvatarError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  changeDescriptionLoading: false,
  changeDescriptionDone: false,
  changeDescriptionError: null,

  myData: {
    id: null,
    avatarNumber: 20,
    nickname: null,
    description: null,
  },
};

const dummyUser = (data) => ({
  id: data.id,
  avatarNumber: 70,
  nickname: 'first_people',
  description: 'my first description',
  Posts: [1, 2],
  Followers: ['gil', 'jgjg2', 'jjj'],
  Followings: ['jgjg1', 'jgjg2'],
});

const reducer = (state = initialState, action) => {
  const { data } = action;
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        isLoggedIn: true,
        myData: dummyUser(data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        isLoggedIn: false,
        myData: {
          ...state.myData,
          id: null,
          avatarNumber: null,
        },
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDoen: false,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDoen: true,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      };

    case AVATAR_CHANGE_REQUEST:
      return {
        ...state,
        changeAvatarLoading: true,
        changeAvatarDone: false,
      };

    case AVATAR_CHANGE_SUCCESS:
      return {
        ...state,
        changeAvatarLoading: false,
        changeAvatarDone: true,
        myData: {
          ...state.myData,
          avatarNumber: data.myAvatar,
        },
      };
    case AVATAR_CHANGE_FAILURE:
      return {
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };

    case NICKNAME_CHANGE_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
      };

    case NICKNAME_CHANGE_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
        myData: {
          ...state.myData,
          nickname: data.nickname,
        },
      };
    case NICKNAME_CHANGE_FAILURE:
      return {
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };

    case DESCRIPTION_CHANGE_REQUEST:
      return {
        ...state,
        changeDescriptionLoading: true,
        changeDescriptionDone: false,
      };
    case DESCRIPTION_CHANGE_SUCCESS:
      return {
        ...state,
        changeDescriptionLoading: false,
        changeDescriptionDone: true,
        myData: {
          ...state.myData,
          description: data.description,
        },
      };
    case DESCRIPTION_CHANGE_FAILURE:
      return {
        ...state,
        changeDescriptionLoading: false,
        changeDescriptionError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
