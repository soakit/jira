import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "views/login/login";

const Router: React.FC = () => {
  // TODO: 记录跳转前的路由，登录后跳转回来
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
        {/* <Route path="*">
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
