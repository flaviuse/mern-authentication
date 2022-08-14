import { Navigate } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? children : <Navigate to='/login' replace />;
}
