import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import wrapper from '../store/configureStore';
import { loadMyDataAction } from '../reducers/userActionCreator';

const App = ({ Component }) => {
  const dispatch = useDispatch();

  const { loginState, logoutState } = useSelector((state) => state.user);

  useEffect(() => {
    loginState && toast.success('login');
    logoutState && toast.success('logout');
  }, [loginState, logoutState]);

  useEffect(() => {
    dispatch(loadMyDataAction());
  }, []);

  return (
    <>
      <Head>
        <title>jgjgill</title>
        <meta charSet="utf-8" />
        <link href="https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap" rel="stylesheet" />
      </Head>
      <Component />
      <ToastContainer
        theme="dark"
        position="bottom-right"
      />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
