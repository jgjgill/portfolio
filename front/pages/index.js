import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { createGlobalStyle } from 'styled-components';
import { toast } from 'react-toastify';

import AppLayout from '../components/layouts/AppLayout';
import PostForm from '../components/contents/home/PostForm';
import PostCard from '../components/contents/home/PostCard';
import { loadPostsAction } from '../reducers/postActionCreator';
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
  const { myData, followDone, unfollowDone } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsAction({ lastId }));
      console.log(lastId);
    }
    console.log(inView);
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  useEffect(() => {
    dispatch(loadMyDataAction());
  }, [mainPosts]);

  useEffect(() => {
    followDone && toast.success('follow!!');
    unfollowDone && toast.success('unfollow!!');
  }, [followDone, unfollowDone]);

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
