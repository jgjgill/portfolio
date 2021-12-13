import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input } from 'antd';
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
    console.log('search');
    router.push(`/hashtag/${searchValue}`);
  }, [searchValue]);

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
        <SearchInput placeholder="title" value={searchValue} onChange={onChangeSearch} onSearch={onSearch} />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
