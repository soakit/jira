import React, { useEffect } from "react";
import { Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { useSelector } from "redux/store";
import { useDispatch } from "react-redux";
import { getProjectUsers } from "redux/project.slice";

export const UserPopover = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.project.users);

  useEffect(() => {
    dispatch(getProjectUsers({ useCache: false }));
  }, [dispatch]);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
