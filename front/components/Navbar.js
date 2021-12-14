import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Select } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInput } from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Navbar = () => {
  const [searchValue, onChangeSearch] = useInput('');

  const router = useRouter();
  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchValue}`);
  }, [searchValue]);

  const onChangeRate = useCallback((value) => {
    console.log(value);
    router.push(`/rate/${value}`);
  }, []);

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link href="/">
          <a>Home</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="list">
        <Link href="/list">
          <a>List</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="profile">
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="signup">
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </Menu.Item>

      <Menu.Item key="search">
        <SearchInput placeholder="hashtag" value={searchValue} onChange={onChangeSearch} onSearch={onSearch} />
      </Menu.Item>

      <Menu.Item key="filter">
        <Select placeholder="movie rate filter" style={{ width: 200 }} onChange={onChangeRate}>
          <Select.Option value="0">0</Select.Option>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
          <Select.Option value="4">4</Select.Option>
          <Select.Option value="5">5</Select.Option>
        </Select>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
