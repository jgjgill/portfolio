import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { createGlobalStyle } from 'styled-components';
import { toast } from 'react-toastify';

import AppLayout from '../components/layouts/AppLayout';
import PostForm from '../components/contents/home/PostForm';
import PostCard from '../components/contents/home/PostCard';
import { loadPostsAction, reweeetPostResetAction } from '../reducers/postActionCreator';
import { loadMyDataAction } from '../reducers/userActionCreator';

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
    retweetPostError,
  } = useSelector((state) => state.post);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsAction({ lastId }));
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  useEffect(() => {
    dispatch(loadMyDataAction());
  }, [mainPosts]);

  useEffect(() => {
    if (retweetPostError) {
      toast.error(retweetPostError);
      dispatch(reweeetPostResetAction());
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

export default Home;
