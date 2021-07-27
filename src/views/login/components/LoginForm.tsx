import React from "react";
import { Form, Input } from "antd";
import { LongButton } from "../login";
import { login } from "redux/auth.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "redux/store";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    await dispatch(login(values));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
