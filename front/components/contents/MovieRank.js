import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD');

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

  const getMovies = useCallback(async () => {
    try {
      const {
        data: {
          boxOfficeResult: { dailyBoxOfficeList: movies },
        },
      } = await axios.get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${''}&targetDt=${yesterday}`,
      );

      setMoviesList({ movies });
      setMoviesLoading({ isLoading: false });

      console.log(moviesList);
    } catch (err) {
      console.error(err);
    }
  }, []);

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
