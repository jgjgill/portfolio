import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Popover, Rate, List } from 'antd';
import {
  EllipsisOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import styled from 'styled-components';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { removePostAction } from '../../../reducers/postActionCreator';
import CommentContent from './CommentContent';
import FollowButton from './FollowButton';

const CardWrapper = styled(Card)`
  margin-bottom: 10px;
  width: 100%;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const id = myData?.id;

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostAction({ postId: post.id }));
  }, []);

  return (
    <>
      <CardWrapper
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost}>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} postId={post.id} />}
          avatar={(
            <Avatar
              src={`https://joeschmoe.io/api/v1/${post.User.avatarNumber}`}
            />
          )}
        />
        <Rate allowHalf disabled defaultValue={post.rateNumber} />
      </CardWrapper>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <CommentContent commentData={item} postId={post.id} />
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.any,
    User: PropTypes.object,
    content: PropTypes.string,
    rateNumber: PropTypes.number,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    createAt: PropTypes.object,
  }).isRequired,
};

export default PostCard;
