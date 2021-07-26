import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/projects" render={() => <h1>项目页 ！</h1>} />
        <Redirect to="/projects" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
