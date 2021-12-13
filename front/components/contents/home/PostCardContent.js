import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postContent }) => (
  <>
    {postContent.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
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
};

export default PostCardContent;
