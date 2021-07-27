import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth.slice";
import { projectSlice } from "./project.slice";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector, // 从store中连接数据
} from "react-redux";

const rootReducer = {
  auth: authSlice.reducer,
  project: projectSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
