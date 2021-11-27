import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Layout, Row } from 'antd';
import styled from 'styled-components';

import Footer from '../Footer';
import Navbar from '../Navbar';
import LoginForm from '../contents/LoginForm';
import UserProfile from '../contents/UserProfile';
import MovieRank from '../contents/MovieRank';

// const LayoutApp = styled(Layout)`
//   margin: 0;
//   padding: 0;
// `;

const LayoutHeader = styled(Layout.Header)`
  height: 100%;
  padding: 0;
`;

const LayoutContent = styled(Layout.Content)`
  height: 100%;
`;
const LayoutFooter = styled(Layout.Footer)`
  height: 100%;
`;

const AppLayout = ({ children }) => {
  const { myData } = useSelector((state) => state.user);

  return (
    <Layout>
      <LayoutHeader>
        <Navbar />
      </LayoutHeader>

      <LayoutContent>
        <Row>
          <Col xs={24} md={5}>
            {myData ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={14}>
            {children}
          </Col>
          <Col xs={24} md={5}>
            <MovieRank />
          </Col>
        </Row>
      </LayoutContent>

      <LayoutFooter>
        <Footer />
      </LayoutFooter>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
