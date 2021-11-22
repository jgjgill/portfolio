import {
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  NICKNAME_CHANGE_REQUEST,
  DESCRIPTION_CHANGE_REQUEST,
  SIGN_UP_REQUEST,
  AVATAR_CHANGE_REQUEST,
} from './action';

export const loginRequestAction = (data) => {
  console.log('loginData : ', data);
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const signupAction = (data) => {
  console.log('signup: ', data);
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const avatarChangeAction = (data) => {
  console.log('avatarChange: ', data);
  return {
    type: AVATAR_CHANGE_REQUEST,
    data,
  };
};

export const nicknameChangeAction = (data) => {
  console.log('nicknameChange: ', data);
  return {
    type: NICKNAME_CHANGE_REQUEST,
    data,
  };
};

export const descriptionChangeAction = (data) => {
  console.log('descriptionChange: ', data);
  return {
    type: DESCRIPTION_CHANGE_REQUEST,
    data,
  };
};
