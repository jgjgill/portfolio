import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
// import {} from "@ant-design/icons";
import styled from 'styled-components';
import Link from 'next/link';

import { logoutAction } from '../../reducers/userActionCreator';

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { myData, logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <CardWrapper
        actions={[
          <Link href="/">
            <a><div key="posts">{myData.Posts.length}<br />posts</div></a>
          </Link>,
          <Link href="/profile">
            <a><div key="followers">{myData.Follower.length}<br />followers</div></a>
          </Link>,
          <Link href="/profile">
            <a><div key="following">{myData.Following.length}<br />following</div></a>
          </Link>,
        ]}
      >
        <Card.Meta
          avatar={(
            <Avatar
              src={`https://joeschmoe.io/api/v1/${myData.avatarNumber}`}
            />
          )}
          title={myData.nickname}
          description={myData.description}
        />
      </CardWrapper>
      <Button>Profile Edit</Button>
      <Button onClick={onLogout} loading={logoutLoading}>
        Logout
      </Button>
    </>
  );
};

export default UserProfile;
