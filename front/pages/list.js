import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/layouts/AppLayout';
import wrapper from '../store/configureStore';
import { loadMyDataAction } from '../reducers/userActionCreator';

const List = () => (
  <>
    <Head>
      <title>List - jgjgill</title>
    </Head>

    <AppLayout>
      <div>영화 목록 드래그앤드롭</div>
    </AppLayout>
  </>
);

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

export default List;
