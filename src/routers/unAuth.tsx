import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "views/login/login";

const Router: React.FC = () => {
  // TODO: 记录跳转前的路由，登录后跳转回来
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<Login />} />
        <Navigate to="/projects" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
