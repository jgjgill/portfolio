import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import AppLayout from '../components/layouts/AppLayout';
import NicknameEditForm from '../components/contents/profile/NicknameEditForm';
import FollowList from '../components/contents/profile/FollowList';
import FollowingList from '../components/contents/profile/FollowingList';
import AvatarChangeForm from '../components/contents/profile/AvatarChangeForm';
import DescriptionChangeForm from '../components/contents/profile/DescriptionChangeForm';

const GlobalFlex = createGlobalStyle`
  .ant-row {
    justify-content: center
  }
`;

const Profile = () => {
  const { myData } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>내 프로필 - jgjgill</title>
      </Head>
      <AppLayout>
        <GlobalFlex />
        <AvatarChangeForm />
        <NicknameEditForm />
        <DescriptionChangeForm />
        <FollowList data={myData.Followers} />
        <FollowingList data={myData.Followings} />
      </AppLayout>
    </>
  );
};

export default Profile;
