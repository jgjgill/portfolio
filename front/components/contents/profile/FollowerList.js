import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button, Avatar } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { FollowCard, FollowListWrapper } from './styles';

const FollowCardContent = styled(Card.Meta)`
  display: flex;
  flex-direction: column;
`;

const FollowerList = ({ followerData, onClickMore, loading }) => {
  const Grid = useMemo(() => ({ gutter: '4', ms: '2', md: '3' }), []);
  const LoadMore = useMemo(
    () => ({ textAlign: 'center', margin: '10px 0' }),
    [],
  );

  const onUnfollow = useCallback(() => {
    console.log('unfollowAction');
  }, []);

  return (
    <FollowListWrapper
      header="Follower List"
      grid={Grid}
      loadMore={(
        <div style={LoadMore}>
          <Button onClick={onClickMore} loading={loading}>More</Button>
        </div>
        )}
      bordered
      dataSource={followerData}
      renderItem={(follower) => (
        <List.Item>
          <FollowCard actions={[<UserDeleteOutlined key="unfollow" onClick={onUnfollow} />]}>
            <FollowCardContent
              avatar={<Avatar src={`https://joeschmoe.io/api/v1/${follower.avatarNumber}`} />}
              description={follower.nickname}
            />
          </FollowCard>
        </List.Item>
      )}
    />
  );
};

FollowerList.propTypes = {
  followerData: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowerList;
