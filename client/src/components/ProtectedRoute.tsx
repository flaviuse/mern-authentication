import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

export default function ProtectedRoute({ path, component }: RouteProps) {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? <Route path={path} exact component={component} /> : <Redirect to='/login' />;
}
