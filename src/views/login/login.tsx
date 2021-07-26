import React, { useState } from "react";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { Button, Divider } from "antd";
import { useNavigate } from "react-router";

import styled from "@emotion/styled";
import UserLayout from "layouts/UserLayout";

// import { useDocumentTitle } from "utils";
import { ErrorBox } from "components/lib";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  //   useDocumentTitle("请登录注册以继续");

  return (
    <UserLayout>
      <Title>{isRegister ? "请注册" : "请登录"}</Title>
      <ErrorBox error={error} />
      {isRegister ? (
        <RegisterForm
          onError={setError}
          onSuccess={() => setIsRegister(false)}
        />
      ) : (
        <LoginForm
          onError={setError}
          onSuccess={() => {
            navigate("/projects");
          }}
        />
      )}
      <Divider />
      <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
      </Button>
    </UserLayout>
  );
}

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
