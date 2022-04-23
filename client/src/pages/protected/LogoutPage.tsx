import { useEffect } from "react";
import { push } from "connected-react-router";
import { attemptLogout } from "../../store/thunks/auth";
import { useAppDispatch } from "src/store/hooks";

export default function LogoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptLogout());
    dispatch(push("/home"));
  }, [dispatch]);

  return <p>Logout in progress</p>;
}
