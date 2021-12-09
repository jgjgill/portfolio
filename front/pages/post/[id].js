import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { toast } from 'react-toastify';
import AppLayout from '../../components/layouts/AppLayout';
import wrapper from '../../store/configureStore';
import { loadMyDataAction } from '../../reducers/userActionCreator';
import { loadPostAction } from '../../reducers/postActionCreator';
import PostCard from '../../components/contents/home/PostCard';

const GlobalCardExtraFlex = createGlobalStyle`
  .ant-card-extra {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, loadPostError } = useSelector((state) => state.post);
  console.log(id);

  useEffect(() => {
    if (!mainPosts[0]) {
      router.push('/');
      toast.error(loadPostError);
    }
  }, []);

  return (
    <>
      {mainPosts[0]
        && (
          <>
            <Head>
              <title>
                {mainPosts[0].User.nickname}
                &#39;s Post
              </title>
              <meta property="og:postUser" content={`${mainPosts[0].User.nickname}'s Post'`} />
              <meta property="og:movieTitle" content={`${mainPosts[0].title}`} />
              <meta property="og:content" content={`${mainPosts[0].content}`} />
              <meta
                property="og:image"
                content={mainPosts[0].Images[0]
                  ? mainPosts[0].Images[0].src
                  : 'https://jgjgill.com/favicon.ico'}
              />
              <meta property="og:url" content={`https://jgjgill.com/post/${id}`} />
            </Head>
            <AppLayout>
              <GlobalCardExtraFlex />

              <PostCard post={mainPosts[0]} />
            </AppLayout>
          </>
        )}
      {null}
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
    store.dispatch(loadPostAction({ postId: params.id }));

    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default Post;
