import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

const MovieList = styled(List)`
  background: #fff;
  font-family: 'Hi Melody';
  font-size: 1.3rem;
`;

const MovieRank = () => {
  const [moviesList, setMoviesList] = useState({
    movies: [],
  });

  const [moviesLoading, setMoviesLoading] = useState({
    isLoading: true,
  });

  const getMovies = async () => {
    try {
      const { data } = await axios.get('/movie/movieRank');

      setMoviesList({ movies: data });
      setMoviesLoading({ isLoading: false });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {moviesLoading.isLoading
        ? ('Loading')
        : (
          <MovieList
            header={<h1>박스오피스 순위</h1>}
            footer={<h4>{`${dayjs().year()}.${dayjs().month() + 1}.${dayjs().date() - 1}`}</h4>}
            bordered
            dataSource={moviesList.movies}
            renderItem={
              (movie) => (
                <List.Item>
                  {movie.rank}. {movie.movieNm}
                </List.Item>
              )
            }
          />
        )}
    </div>
  );
};

export default MovieRank;
