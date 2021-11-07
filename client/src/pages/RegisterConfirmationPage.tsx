import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { attemptGetConfirmation } from "../store/thunks/auth";
import { Error } from "../components";
import { useAppSelector, useAppDispatch } from "src/store/hooks";

export default function RegisterConfirmationPage() {
  const { isAuth } = useAppSelector((state) => state.user);
  const [serverError, setServerError] = useState(null);
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();

  function doSubmit() {
    dispatch(attemptGetConfirmation(token)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  }

  return isAuth ? (
    <Redirect to='/home' />
  ) : (
    <div className='container'>
      <p>Click here to confirm your email</p>
      <button onClick={doSubmit}>Confirmation</button>
      {serverError && <Error>{serverError}</Error>}
    </div>
  );
}
