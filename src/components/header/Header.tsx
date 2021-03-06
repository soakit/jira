import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Link } from "react-router-dom";
import { Dropdown, Row, Menu, Button } from "antd";
import { useAuth } from "context/auth";
import { ProjectPopover } from "components/ProjectPopover";
import { UserPopover } from "components/UserPopover";

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const PageHeader = () => {
  return (
    <Header justify="space-between" align="middle" wrap={false}>
      <HeaderLeft align="middle" wrap={false} gutter={20}>
        <Link to="/">
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Link>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
export default PageHeader;
