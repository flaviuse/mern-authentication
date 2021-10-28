import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {
  path: string;
  component: React.ComponentType<any>;
};

export default function ProtectedRoute({ path, component }: ProtectedRouteProps) {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Route path={path} exact component={component} /> : <Redirect to='/login' />;
}
