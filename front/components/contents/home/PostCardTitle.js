import React from 'react';
import PropTypes from 'prop-types';

const PostCardTitle = ({ postTitle }) => (
  <span>{postTitle}</span>
);

PostCardTitle.propTypes = {
  postTitle: PropTypes.string.isRequired,
};

export default PostCardTitle;
