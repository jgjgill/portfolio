import React, { useCallback } from 'react';
import { Avatar, Button, Comment, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Link from 'next/link';

import { removeCommentAction } from '../../../reducers/postActionCreator';

const CommentContent = ({ commentData, postId }) => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const id = commentData?.User.id;

  const onRemoveComment = useCallback(() => {
    dispatch(removeCommentAction({ postId, commentId: commentData.id }));
  });

  return (
    <>
      <Comment
        author={commentData.User.nickname}
        id={commentData.id}
        content={commentData.content}
        datetime={(
          <Tooltip title={dayjs(commentData.createdAt).format('YYYY/MM/DD HH:MM:ss')}>
            <span>{`${dayjs().diff(commentData.createdAt, 'day')}일 전`}</span>
          </Tooltip>
        )}
        avatar={(
          <Link href={`/user/${commentData.UserId}`}>
            <a>
              <Avatar
                src={`https://joeschmoe.io/api/v1/${commentData.User.avatarNumber}`}
              />
            </a>
          </Link>
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
    content: PropTypes.string,
    createdAt: PropTypes.string,
    UserId: PropTypes.number,
  }).isRequired,
  postId: PropTypes.number.isRequired,
};

export default CommentContent;
