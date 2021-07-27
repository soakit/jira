import React from "react";
import { Navigate, Route, Routes } from "react-router";

import Login from "views/login/login";

const Router: React.FC = () => {
  // TODO: 记录跳转前的路由，登录后跳转回来
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Router;
