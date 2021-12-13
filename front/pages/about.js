import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/layouts/AppLayout';
import wrapper from '../store/configureStore';
import { loadUserAction } from '../reducers/userActionCreator';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);
  return (
    <>
      <Head>
        <title>User Info</title>
      </Head>
      <AppLayout>
        {userInfo
          && (
          <Card
            actions={[
              <div key="posts">
                Posts
                <br />
                {userInfo.Posts}
              </div>,
              <div key="followers">
                Followers
                <br />
                {userInfo.Follower}
              </div>,
              <div key="Followings">
                Followings
                <br />
                {userInfo.Following}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={`https://joeschmoe.io/api/v1/${userInfo.avatarNumber}`} />}
              title={userInfo.nickname}
              description={userInfo.description}
            />
          </Card>
          )}
      </AppLayout>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async ({ req }) => {
    store.dispatch(loadUserAction({ userId: 1 }));

    console.log('1233오오오');
    console.log(req);
    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default About;
