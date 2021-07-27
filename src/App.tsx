import React, { useEffect } from "react";
import "./App.css";
// import Router from "./routers";
// import UnAuth from "./routers/unAuth";
import { ErrorBoundary } from "components/ErrorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useSelector } from "redux/store";
import { useDispatch } from "react-redux";
import { getUserInfo } from "redux/auth.slice";

const Router = React.lazy(() => import("./routers"));
const UnAuth = React.lazy(() => import("./routers/unAuth"));

function App() {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <Router /> : <UnAuth />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
