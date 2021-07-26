import React from "react";
import { ErrorObjType } from "./lib";

// 异常发生处理回调
type FallbackRender = (props: ErrorObjType) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<
  // {
  //   children: React.ReactNode;
  //   fallbackRender: FallbackRender;
  // },
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  ErrorObjType
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用更新state的error
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
