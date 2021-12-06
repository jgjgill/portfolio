import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/layouts/AppLayout';
import SignupForm from '../components/contents/signup/SignupForm';
import { loadMyDataAction, signupResetAction } from '../reducers/userActionCreator';
import wrapper from '../store/configureStore';

const Signup = () => {
  const dispatch = useDispatch();
  const { signupDone } = useSelector((state) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (signupDone) {
      router.push('/');
      dispatch(signupResetAction());
      toast.success('welcome!');
    }
  }, [signupDone]);

  return (
    <>
      <Head>
        <title>회원가입 - jgjgil</title>
      </Head>

      <AppLayout>
        <SignupForm />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch(loadMyDataAction());

    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default Signup;
