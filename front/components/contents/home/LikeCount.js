import { HeartTwoTone } from '@ant-design/icons';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LikeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  color: #333;
`;

const LikeCount = ({ postLiked }) => (
  <LikeCountWrapper>
    {postLiked.length}
    <HeartTwoTone twoToneColor="#333" />
  </LikeCountWrapper>
);

LikeCount.propTypes = {
  postLiked: PropTypes.array.isRequired,
};

export default LikeCount;
