import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "../components";
import { attemptSendResetPasswordLink } from "../store/thunks/auth";

export default function ResetPasswordRequestPage() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
  });

  const onSubmit = (values) => {
    const email = values.email;
    dispatch(attemptSendResetPasswordLink(email))
      .then(() => {
        setIsSubmited(true);
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  return isAuth ? (
    <Redirect to='/home' />
  ) : isSubmited ? (
    <div className='container'>
      <p>
        A reset link has been sent to your email. <b>You have 12 hours to activate your account.</b>
        It can take up to 15 min to receive our email.
      </p>
    </div>
  ) : (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <div className='container'>
            <p>We will send you a reset link on the following email :</p>
            <Form className='form'>
              <div className='field'>
                <label htmlFor='email'>Email</label>
                <Field id='email' name='email' type='email' placeholder='Email' />
                <ErrorMessage name='email' component={Error} />
              </div>

              <button type='submit' disabled={!formik.dirty || !formik.isValid}>
                Send reset link
              </button>
              {serverError && <Error>{serverError}</Error>}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
