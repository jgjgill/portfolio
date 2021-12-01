import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { useReset } from '../../../hooks/useReset';
import { addCommentAction } from '../../../reducers/postActionCreator';

const FormItemWrapper = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const CommentButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const { addCommentLoading, addCommentDone } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({ commentText, postId: post.id, myDataId: myData.id }),
    );
  }, [commentText]);

  useReset(addCommentDone, setCommentText);

  return (
    <Form onFinish={onSubmitComment}>
      <FormItemWrapper>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <CommentButtonWrapper>
          <Button htmlType="submit" loading={addCommentLoading}>
            입력
          </Button>
        </CommentButtonWrapper>
      </FormItemWrapper>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
