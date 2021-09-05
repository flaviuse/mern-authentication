import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Error } from "../components";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
} from "../store/thunks/auth";

export default function RegisterPage() {
  const { isAuth } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState("");
  const [email, setEmail] = useState("");
  const [registerStep, setRegisterStep] = useState("register"); // Use an enum with TS;

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const onSubmit = (values) => {
    dispatch(attemptRegister(values))
      .then(() => {
        setEmail(values.email);
        setRegisterStep("resend");
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  const onResendEmail = () => {
    dispatch(attemptResendConfirmation(email))
      .then(() => {
        setRegisterStep("reset");
      })
      .catch((error) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  const onReset = () => {
    dispatch(attemptResetRegister(email)).catch((error) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  };

  function renderSwitch() {
    switch (registerStep) {
      case "register":
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {(formik) => {
              return (
                <div className='container'>
                  <Form className='form'>
                    <div className='field'>
                      <label htmlFor='email'>Email</label>
                      <Field id='email' name='email' type='email' placeholder='Email' />
                      <ErrorMessage name='email' component={Error} />
                    </div>
                    <div className='field'>
                      <label htmlFor='username'>Username</label>
                      <Field id='username' name='username' type='text' placeholder='Username' />
                      <ErrorMessage name='username' component={Error} />
                    </div>
                    <div className='field'>
                      <label htmlFor='password'>Password</label>
                      <Field id='password' name='password' type='password' placeholder='Password' />
                      <ErrorMessage name='password' component={Error} />
                    </div>
                    <button type='submit' disabled={!formik.dirty || !formik.isValid}>
                      Signup
                    </button>
                    {serverError && <Error>{serverError}</Error>}
                  </Form>
                </div>
              );
            }}
          </Formik>
        );
      case "resend":
        return (
          <div className='container'>
            <p>A verification email has been sent.</p>
            <p>Check you mailbox : {email}.</p>
            <p>
              You have 12 hours to activate your account. It can take up to 15 min to receive our
              email.
            </p>
            <button onClick={onResendEmail}>
              Did not receive the email? Click here to send again.
            </button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );

      case "reset":
        return (
          <div className='container'>
            <p>Still not received an email? </p>
            <p>Try to register again. You may have given the wrong email. </p>
            <p>If you want to be able to use the same username, reset the registration :</p>
            <button onClick={onReset}>Click here to reset the registration</button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );
      default:
        break;
    }
  }

  return isAuth ? <Redirect to='/home' /> : <Fragment>{renderSwitch()}</Fragment>;
}
