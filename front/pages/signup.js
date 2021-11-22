import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/layouts/AppLayout';
import SignupForm from '../components/contents/signup/SignupForm';

const Signup = () => (
  <>
    <Head>
      <title>회원가입 - jgjgil</title>
    </Head>

    <AppLayout>
      <SignupForm />
    </AppLayout>
  </>
);

export default Signup;
