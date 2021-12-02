import { HeartOutlined } from '@ant-design/icons';
import React from 'react';
import PropTypes from 'prop-types';

const LikeCount = ({ postLiked }) => {
  console.log(postLiked);

  return (
    <div>
      <HeartOutlined />
      좋아요 개수
      {postLiked.length}
    </div>
  );
};

LikeCount.propTypes = {
  postLiked: PropTypes.array.isRequired,
};

export default LikeCount;
