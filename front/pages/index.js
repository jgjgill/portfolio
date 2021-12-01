import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import AppLayout from '../components/layouts/AppLayout';
import PostForm from '../components/contents/home/PostForm';
import PostCard from '../components/contents/home/PostCard';
import { loadPostsAction } from '../reducers/postActionCreator';
import { loadMyDataAction } from '../reducers/userActionCreator';

const Home = () => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

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

  return (
    <>
      <Head>
        <title>홈 - jgjgil</title>
      </Head>
      <AppLayout>
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
