import React from "react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { BrowserRouter } from "react-router-dom";

export const AppProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};
