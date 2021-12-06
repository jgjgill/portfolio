import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/layouts/AppLayout';
import NicknameEditForm from '../components/contents/profile/NicknameEditForm';
import FollowList from '../components/contents/profile/FollowList';
import FollowingList from '../components/contents/profile/FollowingList';
import AvatarChangeForm from '../components/contents/profile/AvatarChangeForm';
import DescriptionChangeForm from '../components/contents/profile/DescriptionChangeForm';
import { loadMyDataAction } from '../reducers/userActionCreator';
import wrapper from '../store/configureStore';

const GlobalFlex = createGlobalStyle`
  .ant-row {
    justify-content: center
  }
`;

const Profile = () => {
  const { myData } = useSelector((state) => state.user);

  // const [followerListMore, setFollowerListMore] = useState(3);
  // const [followingListMore, setFollowingListMore] = useState(3);

  const router = useRouter();
  useEffect(() => {
    if (!myData) {
      router.replace('/');
      toast.error('LOGIN!');
    }
  }, [myData]);

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
        <FollowList followerData={myData.Follower} />
        <FollowingList followingData={myData.Following} />
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
  },
);

export default Profile;
