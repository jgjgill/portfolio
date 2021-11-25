import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AppLayout from '../components/layouts/AppLayout';
import SignupForm from '../components/contents/signup/SignupForm';
import { signupRestAction } from '../reducers/userActionCreator';

const Signup = () => {
  const dispatch = useDispatch();
  const { signupDone } = useSelector((state) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (signupDone) {
      router.push('/');
      dispatch(signupRestAction());
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

export default Signup;
