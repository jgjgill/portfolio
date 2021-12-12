import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';
import AppLayout from '../components/layouts/AppLayout';
import NicknameEditForm from '../components/contents/profile/NicknameEditForm';
import FollowingList from '../components/contents/profile/FollowingList';
import FollowerList from '../components/contents/profile/FollowerList';
import AvatarChangeForm from '../components/contents/profile/AvatarChangeForm';
import DescriptionChangeForm from '../components/contents/profile/DescriptionChangeForm';
import { loadMyDataAction } from '../reducers/userActionCreator';
import wrapper from '../store/configureStore';

const GlobalFlex = createGlobalStyle`
  .ant-row {
    justify-content: center
  }
`;

const fetcher = (url) => axios.get(url, { withCredentials: true })
  .then((res) => res.data);

const Profile = () => {
  const { myData } = useSelector((state) => state.user);

  const [followerLimit, setFollowerLimit] = useState(3);
  const [followingLimit, setFollowingLimit] = useState(3);

  const { data: followerList, error: followerError } = useSWR(`http://localhost:3065/user/follower/list?limit=${followerLimit}`, fetcher);
  const { data: followingList, error: followingError } = useSWR(`http://localhost:3065/user/following/list?limit=${followingLimit}`, fetcher);

  const loadMoreFollower = useCallback(() => {
    setFollowerLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowing = useCallback(() => {
    setFollowingLimit((prev) => prev + 3);
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (!myData) {
      router.replace('/');
      toast.error('LOGIN!');
    }
  }, [myData]);

  useEffect(() => {
    (followingError || followerError)
    && toast.error('Follow List Error!!');
  }, []);

  return (
    <>
      <Head>
        <title>내 프로필 - jgjgill</title>
      </Head>
      {myData && (
      <AppLayout>
        <GlobalFlex />
        <AvatarChangeForm />
        <NicknameEditForm />
        <DescriptionChangeForm />
        {followerList
        && (
        <FollowerList
          followerData={followerList}
          onClickMore={loadMoreFollower}
          loading={!followerList && !followerError}
        />
        )}
        {followingList
        && (
        <FollowingList
          followingData={followingList}
          onClickMore={loadMoreFollowing}
          loading={!followingList && !followingError}
        />
        )}
      </AppLayout>
      )}

    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch(loadMyDataAction());

    store.dispatch(END);
    await store.sagaTask.toPromise();

    // const res = await axios.get(`http://localhost:3065/user/follower/list?limit=${followerLimit}`);

    // console.log(res);
    // const data = await res.json();

    // return {
    //   props: { data },
    // };
  },
);

export default Profile;
