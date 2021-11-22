import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { descriptionChangeAction } from '../../../reducers/userActionCreator';
import useReset from '../../../hooks/useReset';

const FormItemWrapper = styled(Form.Item)`
  padding: 20px;
  border-bottom: 1px solid #c9c9c9;
  margin-bottom: 20px;
`;

const DescriptionChangeForm = () => {
  const { changeDescriptionLoading, changeDescriptionDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [description, onChangeDescription, setDescription] = useInput('');

  const onSubmitDescription = useCallback(() => {
    dispatch(descriptionChangeAction({ description }));
  }, [description]);

  useReset(changeDescriptionDone, setDescription);

  return (
    <Form onFinish={onSubmitDescription}>
      <FormItemWrapper>
        <Input
          value={description}
          onChange={onChangeDescription}
          placeholder="description change"
          required
        />
        <Button htmlType="submit" loading={changeDescriptionLoading}>수정</Button>
      </FormItemWrapper>
    </Form>
  );
};

export default DescriptionChangeForm;
