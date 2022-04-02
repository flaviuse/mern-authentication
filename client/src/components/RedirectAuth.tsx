import React from "react";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

export const RedirectAuth: React.FC = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <Redirect to='/home' /> : <>{children}</>;
};
