const userState = {
  loginLoading: false,
  loginError: null,

  logoutLoading: false,
  logoutError: null,

  isLoggedIn: false,

  signupLoading: false,
  signupDone: false,
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

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  myData: {
    id: null,
    avatarNumber: null,
    nickname: null,
    description: null,
    Posts: [],
    Followers: [],
    Followings: [],
  },
};

export default userState;
