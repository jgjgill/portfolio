import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD');
const movieURL = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_MOVIE_KEY}&targetDt=${yesterday}`;

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
        movieURL,
      );

      const response = await toast.promise(
        fetch(movieURL),
        {
          pending: {
            render() {
              return 'boxoffice loading...';
            },
          },
          success: {
            render() {
              return 'boxoffice success!';
            },
          },
          error: {
            render() {
              return 'boxoffice error...';
            },
          },
        },
      );
      console.log(response);

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
