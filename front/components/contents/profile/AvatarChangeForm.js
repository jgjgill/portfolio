import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { avatarChangeAction } from '../../../reducers/userActionCreator';

const AvatarChangeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarImg = styled(Avatar)`
  background-color: #fff;
  margin: 20px 0;
`;

const AvatarChangeForm = () => {
  const grid = useMemo(
    () => ({ xs: 50, sm: 80, md: 100, lg: 200, xl: 300, xxl: 350 }),
    [],
  );

  const { avatarNumber } = useSelector((state) => state.user.myData);
  const { changeAvatarLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [myAvatar, setMyAvatar] = useState(avatarNumber);

  const onChangeAvatar = useCallback(() => {
    setMyAvatar(shortid.generate());
  }, [myAvatar]);

  useEffect(() => {
    dispatch(avatarChangeAction({ myAvatar }));
  }, [myAvatar]);

  console.log(myAvatar);
  return (
    <AvatarChangeWrapper>
      <AvatarImg
        src={`https://joeschmoe.io/api/v1/${myAvatar}`}
        size={grid}
      />
      {/* <div>asd</div> */}
      <Button type="primary" onClick={onChangeAvatar} loading={changeAvatarLoading}>
        프로필 사진 변경
      </Button>
    </AvatarChangeWrapper>
  );
};

export default AvatarChangeForm;
