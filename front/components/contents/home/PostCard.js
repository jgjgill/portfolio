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
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Link from 'next/link';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { likePostAction, removePostAction, retweetPostAction, unlikePostAction } from '../../../reducers/postActionCreator';
import CommentContent from './CommentContent';
import FollowButton from './FollowButton';
import LikeCount from './LikeCount';
import PostCardTitle from './PostCardTitle';
import { CardWrapper } from './styles';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { myData } = useSelector((state) => state.user);
  const id = myData?.id;

  const [likeState, setLikeState] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onRetweet = useCallback(() => {
    if (id) {
      dispatch(retweetPostAction({ postId: post.id }));
    } else {
      toast.error('login!!');
    }
  }, [id]);

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
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
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
                    {post.RetweetId ? null : <Button>??????</Button>}
                    <Button type="danger" onClick={onRemovePost}>??????</Button>
                  </>
                ) : (
                  <Button>??????</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={(
          <>
            {post.RetweetId
            && (
              <div>
                <span>Retweet Post</span>
                <div>
                  <Link href={`/user/${post.User.id}`}>
                    <a>
                      <Avatar
                        src={`https://joeschmoe.io/api/v1/${post.User.avatarNumber}`}
                      />
                    </a>
                  </Link>
                  <span>{post.User.nickname}</span>
                </div>
              </div>
            )}
            <LikeCount postLiked={post.Liker} />
            {(id && (id !== post.User.id)) && <FollowButton post={post} />}
            <Tooltip title={dayjs(post.createdAt).format('YYYY/MM/DD HH/MM/ss')}>
              <span>{`${dayjs().diff(post.createdAt, 'day')}??? ???`}</span>
            </Tooltip>
          </>
        )}
      >
        {post.RetweetId
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <Card.Meta
                title={post.Retweet.User.nickname}
                description={(
                  <>
                    <PostCardTitle postTitle={post.Retweet.title} />
                    <PostCardContent
                      postContent={post.Retweet.content}
                      postId={post.Retweet.id}
                      postCreatedAt={post.Retweet.createdAt}
                    />
                  </>
                )}
                avatar={(
                  <Link href={`/user/${post.Retweet.User.id}`}>
                    <a>
                      <Avatar
                        src={`https://joeschmoe.io/api/v1/${post.Retweet.User.avatarNumber}`}
                      />
                    </a>
                  </Link>
                )}
              />
              <Rate disabled defaultValue={post.Retweet.rateNumber} />
            </Card>
          )
          : (
            <>
              <Card.Meta
                title={post.User.nickname}
                description={(
                  <>
                    <PostCardTitle postTitle={post.title} />
                    <PostCardContent
                      postContent={post.content}
                      postCreatedAt={post.createdAt}
                    />
                  </>
                )}
                avatar={(
                  <Link href={`/user/${post.User.id}`}>
                    <a>
                      <Avatar
                        src={`https://joeschmoe.io/api/v1/${post.User.avatarNumber}`}
                      />
                    </a>
                  </Link>
                )}
              />
              <Rate disabled defaultValue={post.rateNumber} />
            </>
          )}
      </CardWrapper>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}?????? ??????`}
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
    RetweetId: PropTypes.number,
    Retweet: PropTypes.object,
  }).isRequired,
};

export default PostCard;
