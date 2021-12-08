import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

const MovieList = styled(List)`
  background: #fff;
  font-family: 'Hi Melody';
  font-size: 1.3rem;
`;

const MovieRank = ({ movieData }) => (
  <MovieList
    header={<h1>박스오피스 순위</h1>}
    footer={<h4>{`${dayjs().year()}.${dayjs().month() + 1}.${dayjs().date() - 1}`}</h4>}
    bordered
    dataSource={movieData}
    renderItem={(movie) => (
      <List.Item>
        {movie.rank}. {movie.movieNm}
      </List.Item>
    )}
  />
);

MovieRank.propTypes = {
  movieData: PropTypes.array.isRequired,
};

export default MovieRank;
