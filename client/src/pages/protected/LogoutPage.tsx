import { useEffect } from "react";
import { attemptLogout } from "../../store/thunks/auth";
import { useAppDispatch } from "src/store/hooks";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(attemptLogout(navigate));
    navigate("/home", { replace: true });
  }, [dispatch, navigate]);

  return <p>Logout in progress</p>;
}
