import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import Footer from '../Footer';
import Navbar from '../Navbar';
import LoginForm from '../contents/LoginForm';
import UserProfile from '../contents/UserProfile';
import MovieRank from '../contents/MovieRank';
import {
  LayoutWrapper,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
} from './styles';

const fetcher = (url) => axios.get(url, { withCredentials: true })
  .then((res) => res.data);
const movieURL = 'http://localhost:3065/movie/movieRank';

const AppLayout = ({ children }) => {
  const { myData } = useSelector((state) => state.user);

  const { data: movieData, error: movieError } = useSWR(movieURL, fetcher);

  return (
    <LayoutWrapper>
      <LayoutHeader>
        <Navbar />
      </LayoutHeader>

      <LayoutContent>
        <Row gutter={8}>
          <Col xs={24} md={5}>
            {myData ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={14}>
            {children}
          </Col>
          <Col xs={24} md={5}>
            {movieData
              ? <MovieRank movieData={movieData} />
              : <div>Loading...</div>}
            {movieError && <div>Movie Error!</div>}
          </Col>
        </Row>
      </LayoutContent>

      <LayoutFooter>
        <Footer />
      </LayoutFooter>
    </LayoutWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
