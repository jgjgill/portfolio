import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { createGlobalStyle } from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/layouts/AppLayout';
import PostForm from '../components/contents/home/PostForm';
import PostCard from '../components/contents/home/PostCard';
import {
  loadPostsAction,
  reweetPostResetAction,
} from '../reducers/postActionCreator';
import { loadMyDataAction } from '../reducers/userActionCreator';
import wrapper from '../store/configureStore';

const GlobalCardExtraFlex = createGlobalStyle`
  .ant-card-extra {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    retweetPostError } = useSelector((state) => state.post);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsAction({ lastId }));
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  useEffect(() => {
    if (retweetPostError) {
      toast.error(retweetPostError);
      dispatch(reweetPostResetAction());
    }
  }, [retweetPostError]);

  return (
    <>
      <Head>
        <title>홈 - jgjgil</title>
      </Head>
      <AppLayout>
        <GlobalCardExtraFlex />
        {myData && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
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
    store.dispatch(loadPostsAction());
    store.dispatch(loadMyDataAction());

    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default Home;
