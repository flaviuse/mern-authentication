import { ComponentType } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

type ProtectedRouteProps = {
  path: string;
  component: ComponentType<any>;
};

export default function ProtectedRoute({ path, component }: ProtectedRouteProps) {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <Route path={path} exact component={component} /> : <Redirect to='/login' />;
}
