import React, { useCallback, useContext, useEffect } from "react";
import * as auth from "./auth-provider";
import { http } from "utils/http";
import { useAsync } from "hooks/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { User } from "types/user";

export interface AuthForm {
  username: string;
  password: string;
}

const getUserInfo = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form);
  const logout = () => {
    auth.logout().then(setUser);
  };

  const moutedFn = useCallback(() => {
    run(getUserInfo());
  }, [run]);

  // 初始化时尝试获取用户信息
  useEffect(moutedFn, [moutedFn]);

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用!");
  }
  return context;
};
