import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { loginRequestAction } from '../../reducers/userActionCreator';
import { useInput } from '../../hooks/useInput';

const ButtonWrapper = styled.div`
  /* margin-left: 10px; */
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const FormItemWrapper = styled(Form.Item)`
  margin-bottom: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginError, isLoggedIn } = useSelector((state) => state.user);

  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    toast.success('logout');
  }, []);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ username, password }));
  }, [username, password, isLoggedIn]);

  useEffect(() => {
    loginError && toast.error(loginError, {
      position: toast.POSITION.TOP_CENTER,
    });
  }, [loginError]);

  return (
    <FormWrapper onFinish={onSubmitForm} layout="vertical">
      <FormItemWrapper label="Username" name="username">
        <Input
          onChange={onChangeUsername}
          value={username}
          required
          placeholder="username"
        />
      </FormItemWrapper>

      <FormItemWrapper label="Password" name="password">
        <Input.Password
          onChange={onChangePassword}
          value={password}
          required
          placeholder="password"
        />
      </FormItemWrapper>

      <FormItemWrapper>
        <Checkbox>Remember me</Checkbox>
      </FormItemWrapper>

      <FormItemWrapper>
        <ButtonWrapper>
          <Button htmlType="submit" loading={loginLoading}>
            Submit
          </Button>
          <Link href="/signup">
            <a>
              <Button>Signup</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </FormItemWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
