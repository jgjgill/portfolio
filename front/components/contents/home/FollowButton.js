import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { followAction, unfollowAction } from '../../../reducers/userActionCreator';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { myData, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = myData?.Followings.find((v) => v === post.User.id);

  const followToggle = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowAction({ userId: post.User.id }));
    } else {
      dispatch(followAction({ userId: post.User.id }));
    }
  }, [isFollowing]);

  return (
    <div>
      <Button
        onClick={followToggle}
        loading={followLoading || unfollowLoading}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};

FollowButton.propTypes = {
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

export default FollowButton;
