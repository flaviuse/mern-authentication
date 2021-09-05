import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { attemptGetConfirmation } from "../store/thunks/auth";
import { Error } from "../components";

export default function RegisterConfirmationPage() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const { token } = useParams();

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
