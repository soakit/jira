import React from "react";
import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

const FullPageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPageContainer>
    <Spin size={"large"} />
  </FullPageContainer>
);

export type ErrorObjType = { error: Error | null };

export const FullPageErrorFallback = ({ error }: ErrorObjType) => (
  <FullPageContainer>
    <ErrorBox error={error} />
  </FullPageContainer>
);

export const ErrorBox = ({ error }: ErrorObjType) => {
  if (error) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>;
  }
  return null;
};

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const MainContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
