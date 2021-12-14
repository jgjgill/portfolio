import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/contents/home/PostCard';
import wrapper from '../../store/configureStore';
import { loadMyDataAction } from '../../reducers/userActionCreator';
import { loadRatePostsAction } from '../../reducers/postActionCreator';
import { GlobalCardExtraFlex } from '../styles';

const Rate = () => {
  const router = useRouter();
  const { rate } = router.query;

  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadRatePostsLoading } = useSelector((state) => state.post);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasMorePosts && !loadRatePostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadRatePostsAction({ lastId, rateValue: rate }));
    }
  });

  return (
    <>
      <Head>
        <title>
          movieRate
        </title>
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
        <div ref={hasMorePosts && !loadRatePostsLoading ? ref : undefined} />
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
    store.dispatch(loadRatePostsAction({ rateValue: params.rate }));

    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default Rate;
