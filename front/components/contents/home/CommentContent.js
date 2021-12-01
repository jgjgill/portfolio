import React, { useCallback } from 'react';
import { Avatar, Button, Comment } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentAction } from '../../../reducers/postActionCreator';

const CommentContent = ({ commentData, postId }) => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const id = commentData?.User.id;

  const onRemoveComment = useCallback(() => {
    dispatch(removeCommentAction({ postId, commentId: commentData.commentId }));
  });

  return (
    <>
      <Comment
        author={commentData.User.nickname}
        id={commentData.id}
        content={commentData.content}
        avatar={(
          <Avatar
            src={`https://joeschmoe.io/api/v1/${commentData.User.avatarNumber}`}
          />
        )}
      />
      {myData?.id === id && <Button type="danger" onClick={onRemoveComment}>삭제</Button>}
    </>
  );
};

CommentContent.propTypes = {
  commentData: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    commentId: PropTypes.any,
    content: PropTypes.string,
  }).isRequired,
  postId: PropTypes.number.isRequired,
};

export default CommentContent;
