import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';
import { FollowCard, FollowListWrapper } from './styles';

const FollowList = ({ followerData }) => {
  const Grid = useMemo(() => ({ gutter: '4', ms: '2', md: '3' }), []);
  const LoadMore = useMemo(
    () => ({ textAlign: 'center', margin: '10px 0' }),
    [],
  );

  return (
    <FollowListWrapper
      header="Follow List"
      grid={Grid}
      loadMore={(
        <div style={LoadMore}>
          <Button>More</Button>
        </div>
        )}
      bordered
      dataSource={followerData}
      renderItem={(follower) => (
        <List.Item>
          <FollowCard actions={[<UserDeleteOutlined key="unfollow" />]}>
            <Card.Meta description={follower.nickname} />
          </FollowCard>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  followerData: PropTypes.array.isRequired,
};

export default FollowList;
