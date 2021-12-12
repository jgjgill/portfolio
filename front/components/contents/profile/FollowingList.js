import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch } from 'react-redux';
import { FollowCard, FollowListWrapper } from './styles';
import { unfollowAction } from '../../../reducers/userActionCreator';

const FollowCardContent = styled(Card.Meta)`
  display: flex;
  flex-direction: column;
`;

const FollowingList = ({ followingData, onClickMore, loading }) => {
  const Grid = useMemo(() => ({ gutter: '4', ms: '2', md: '3' }), []);
  const LoadMore = useMemo(
    () => ({ textAlign: 'center', margin: '10px 0' }),
    [],
  );

  const dispatch = useDispatch();

  const onUnfollow = useCallback((userId) => () => {
    dispatch(unfollowAction({ userId }));
  }, []);

  return (
    <FollowListWrapper
      header="Following List"
      grid={Grid}
      loadMore={(
        <div style={LoadMore}>
          <Button onClick={onClickMore} loading={loading}>More</Button>
        </div>
        )}
      bordered
      dataSource={followingData}
      renderItem={(following) => (
        <List.Item>
          <FollowCard actions={[<UserDeleteOutlined key="unfollowing" onClick={onUnfollow(following.id)} />]}>
            <FollowCardContent
              avatar={<Avatar src={`https://joeschmoe.io/api/v1/${following.avatarNumber}`} />}
              description={following.nickname}
            />
          </FollowCard>
        </List.Item>
      )}
    />
  );
};

FollowingList.propTypes = {
  followingData: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowingList;
