import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';
import { FollowCard, FollowListWrapper } from './styles';

const FollowingList = ({ followingData }) => {
  const Grid = useMemo(() => ({ gutter: '4', ms: '2', md: '3' }), []);
  const LoadMore = useMemo(
    () => ({ textAlign: 'center', margin: '10px 0' }),
    [],
  );

  return (
    <FollowListWrapper
      header="Following List"
      grid={Grid}
      loadMore={(
        <div style={LoadMore}>
          <Button>More</Button>
        </div>
        )}
      bordered
      dataSource={followingData}
      renderItem={(following) => (
        <List.Item>
          <FollowCard actions={[<UserDeleteOutlined key="unfollowing" />]}>
            <Card.Meta description={following.nickname} />
          </FollowCard>
        </List.Item>
      )}
    />
  );
};

FollowingList.propTypes = {
  followingData: PropTypes.array.isRequired,
};

export default FollowingList;
