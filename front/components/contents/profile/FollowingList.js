import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';
import { FollowCard, FollowListWrapper } from './styles';

const FollowingList = ({ data }) => {
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
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <FollowCard actions={[<UserDeleteOutlined key="unfollowing" />]}>
            <Card.Meta description={item} />
          </FollowCard>
        </List.Item>
      )}
    />
  );
};

FollowingList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FollowingList;
