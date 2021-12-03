import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postContent, postId }) => (
  <>
    {postContent.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={postId}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </>
);

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
  postId: PropTypes.any.isRequired,
};

export default PostCardContent;
