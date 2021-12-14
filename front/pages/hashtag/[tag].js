import axios from 'axios';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { loadMyDataAction, loadUserAction } from '../../reducers/userActionCreator';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/contents/home/PostCard';
import { loadHashtagPostsAction, loadUserPostsAction } from '../../reducers/postActionCreator';
import { GlobalCardExtraFlex } from '../styles';

const hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadHashtagPostsLoading } = useSelector((state) => state.post);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasMorePosts && !loadHashtagPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadUserPostsAction({ lastId, hashtagName: tag }));
    }
  }, [inView, hasMorePosts, loadHashtagPostsLoading, mainPosts]);

  return (
    <>
      <Head>
        <title>
          hashtag search
        </title>
        <meta />
        <meta />
        <meta />
        <meta />
        <meta />
      </Head>
      <AppLayout>
        <GlobalCardExtraFlex />
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div ref={hasMorePosts && !loadHashtagPostsLoading ? ref : undefined} />
      </AppLayout>
    </>

  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, params }) => {
    const cookie = req ? req.headers.cookie : '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch(loadMyDataAction());
    store.dispatch(loadUserAction({ userId: params.id }));
    store.dispatch(loadHashtagPostsAction({ hashtagName: params.tag }));

    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default hashtag;
