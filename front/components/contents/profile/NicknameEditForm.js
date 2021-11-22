import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { nicknameChangeAction } from '../../../reducers/userActionCreator';
import useReset from '../../../hooks/useReset';

const FormItemWrapper = styled(Form.Item)`
  padding: 20px;
  border-bottom: 1px solid #c9c9c9;
  margin-bottom: 20px;
`;

const NicknameEditForm = () => {
  const { changeNicknameLoading, changeNicknameDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nickname, onChangeNickname, setNickname] = useInput('');

  const onSubmitNickname = useCallback(() => {
    dispatch(nicknameChangeAction({ nickname }));
  }, [nickname]);

  useReset(changeNicknameDone, setNickname);

  return (
    <Form onFinish={onSubmitNickname}>
      <FormItemWrapper>
        <Input
          value={nickname}
          onChange={onChangeNickname}
          placeholder="nickname change"
          required
        />
        <Button htmlType="submit" loading={changeNicknameLoading}>수정</Button>
      </FormItemWrapper>
    </Form>
  );
};

export default NicknameEditForm;
