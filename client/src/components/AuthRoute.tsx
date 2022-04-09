import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

export const AuthRoute = ({ component, path }: RouteProps) => {
  const { isAuth } = useAppSelector((state) => state.user);

  return !isAuth ? <Route path={path} exact component={component} /> : <Redirect to='/home' />;
};
