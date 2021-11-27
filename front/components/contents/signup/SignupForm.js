import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useInput } from '../../../hooks/useInput';
import { signupAction, signupRestAction } from '../../../reducers/userActionCreator';

const FormItemWrapper = styled(Form.Item)`
  margin-bottom: 10px;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const CheckboxWrapper = styled.div`
  margin-bottom: 10px;
`;

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupError } = useSelector((state) => state.user);

  const [username, onChangeUsername] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
    },
    [passwordCheck],
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
    },
    [term],
  );

  const usernameRef = useRef();

  useEffect(() => {
    password === passwordCheck
      ? setPasswordError(() => false)
      : setPasswordError(() => true);

    term ? setTermError(false) : setTermError(true);
  }, [password, passwordCheck, term]);

  const onSubmit = useCallback(() => {
    if (!(passwordError || termError)) {
      dispatch(signupAction({ username, nickname, password }));
    }

    console.log(username, nickname, password);
  }, [username, nickname, termError, passwordError]);

  useEffect(() => {
    if (signupError) {
      toast.error(signupError, {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch(signupRestAction());
      usernameRef.current.focus();
    }
  }, [signupError, username]);

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <FormItemWrapper label="Username">
        <Form.Item name="signup_username">
          <Input
            onChange={onChangeUsername}
            value={username}
            required
            placeholder="username"
            ref={usernameRef}
          />
        </Form.Item>
      </FormItemWrapper>

      <FormItemWrapper label="Nickname">
        <Form.Item name="signup_nickname" noStyle>
          <Input
            onChange={onChangeNickname}
            value={nickname}
            required
            placeholder="nickname"
          />
        </Form.Item>
      </FormItemWrapper>

      <FormItemWrapper label="Password">
        <Form.Item name="signup_password" noStyle>
          <Input.Password
            onChange={onChangePassword}
            value={password}
            required
            placeholder="password"
          />
        </Form.Item>
      </FormItemWrapper>

      <FormItemWrapper label="PasswordCheck">
        <Form.Item name="signup_passwordCheck" noStyle>
          <Input.Password
            onChange={onChangePasswordCheck}
            value={passwordCheck}
            required
            placeholder="passwordCheck"
          />
        </Form.Item>
        {passwordError && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
      </FormItemWrapper>

      <CheckboxWrapper>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          회원가입 확인!
        </Checkbox>
        {termError && <ErrorMessage>체크해주세요!</ErrorMessage>}
      </CheckboxWrapper>

      <Button htmlType="submit" loading={signupLoading}>
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
