import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

import Login from "views/login/login";

// https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6

const Router: React.FC = () => {
  const navigate = useNavigate();

  const pathName = window.location.pathname;
  useEffect(() => {
    if (pathName !== "/login") {
      navigate({
        pathname: "/login",
        search: `?${createSearchParams({
          redirectTo: encodeURIComponent(window.location.href),
        })}`,
      });
    }
  }, [navigate, pathName]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
