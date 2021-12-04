import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Popover, Rate, List, Tooltip } from 'antd';
import {
  EllipsisOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { likePostAction, removePostAction, unlikePostAction } from '../../../reducers/postActionCreator';
import CommentContent from './CommentContent';
import FollowButton from './FollowButton';
import LikeCount from './LikeCount';

const CardWrapper = styled(Card)`
  margin-bottom: 10px;
  width: 100%;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const id = myData?.id;

  const [likeState, setLikeState] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    if (id) {
      setLikeState((prev) => !prev);
      dispatch(likePostAction({ postId: post.id }));
    } else {
      toast.error('login!!');
    }
  }, [id, likeState]);

  const onUnlike = useCallback(() => {
    if (id) {
      setLikeState((prev) => !prev);
      dispatch(unlikePostAction({ postId: post.id }));
    } else {
      toast.error('login!!');
    }
  }, [id, likeState]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostAction({ postId: post.id }));
  }, []);

  useEffect(() => {
    setLikeState(post.Liker.find((v) => v.id === id));
  }, [myData]);

  return (
    <>
      <CardWrapper
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          likeState ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnlike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
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
        extra={(
          <>
            <LikeCount postLiked={post.Liker} />
            {(id && (id !== post.User.id)) && <FollowButton post={post} />}
            <Tooltip title={dayjs(post.createdAt).format('YYYY/MM/DD HH/MM/ss')}>
              <span>{`${dayjs().diff(post.createdAt, 'day')}일 전`}</span>
            </Tooltip>
          </>
        )}
      >
        <Card.Meta
          title={post.User.nickname}
          description={(
            <>
              <div>{post.title}</div>

              <PostCardContent
                postContent={post.content}
                postId={post.id}
                postCreatedAt={post.createdAt}
              />
            </>
          )}
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
    title: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    rateNumber: PropTypes.number,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    createdAt: PropTypes.string,
    Liker: PropTypes.array,
  }).isRequired,
};

export default PostCard;
