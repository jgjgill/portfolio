import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData, postId }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={postId}>
            <a>{v}</a>
          </Link>
        );
      }

      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  postId: PropTypes.any.isRequired,
};

export default PostCardContent;
