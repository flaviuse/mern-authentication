import { Navigate, useNavigate, useParams } from "react-router-dom";
import { attemptGetConfirmation } from "../store/thunks/auth";
import { Error } from "../components";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";

export default function RegisterConfirmationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { serverError, handleServerError } = useServerError();

  const { token } = useParams<{ token: string }>();

  if (!token) {
    return <Navigate to='/home' replace />;
  }

  const handleSubmit = () => {
    dispatch(attemptGetConfirmation(token, navigate)).catch(handleServerError);
  };

  return (
    <div className='container'>
      <p>Click here to confirm your email</p>

      <button onClick={handleSubmit}>Confirmation</button>
      {serverError && <Error>{serverError}</Error>}
    </div>
  );
}
