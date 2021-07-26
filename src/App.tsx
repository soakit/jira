import React from "react";
import "./App.css";
import { useAuth } from "context/auth";
// import Router from "./routers";
// import UnAuth from "./routers/unAuth";
import { ErrorBoundary } from "components/ErrorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

const Router = React.lazy(() => import("./routers"));
const UnAuth = React.lazy(() => import("./routers/unAuth"));

function App() {
  const { user } = useAuth();
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
