import React from "react";
import styled from "@emotion/styled";
import PageHeader from "components/header/Header";

// function  MainLayout: React.FC = function({children}) { // error
const MainLayout: React.FC = function ({ children }) {
  return (
    <Container>
      <PageHeader />
      <Main>{children}</Main>
    </Container>
  );
};
export default MainLayout;

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
