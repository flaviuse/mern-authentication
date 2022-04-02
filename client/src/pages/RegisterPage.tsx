import { useState } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Error } from "../components";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
} from "../store/thunks/auth";
import { User } from "src/store/actions/user";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { AxiosError } from "axios";

type RegisterFormValues = User;

enum RegisterFormStep {
  Register,
  Resend,
  Reset,
}

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);
  const [serverError, setServerError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [registerStep, setRegisterStep] = useState<RegisterFormStep>(RegisterFormStep.Register);

  const initialValues: RegisterFormValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const handleServerError = (error: AxiosError) => {
    if (error.response) {
      setServerError(error.response.data.message);
    }
  };

  const handleSubmit = (values: RegisterFormValues) => {
    dispatch(attemptRegister(values))
      .then(() => {
        setEmail(values.email);
        setRegisterStep(RegisterFormStep.Resend);
      })
      .catch(handleServerError);
  };

  const handleResendEmail = () => {
    if (!email) return;

    dispatch(attemptResendConfirmation(email))
      .then(() => {
        setRegisterStep(RegisterFormStep.Reset);
      })
      .catch(handleServerError);
  };

  const handleResetRegister = () => {
    if (!email) return;

    dispatch(attemptResetRegister(email))
      .then(() => {
        setRegisterStep(RegisterFormStep.Register);
      })
      .catch(handleServerError);
  };

  function renderSwitch() {
    switch (registerStep) {
      case RegisterFormStep.Register:
        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
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
      case RegisterFormStep.Resend:
        return (
          <div className='container'>
            <p>A verification email has been sent.</p>
            <p>Check you mailbox : {email}.</p>
            <p>
              You have 12 hours to activate your account. It can take up to 15 min to receive our
              email.
            </p>
            <button onClick={handleResendEmail}>
              Did not receive the email? Click here to send again.
            </button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );

      case RegisterFormStep.Reset:
        return (
          <div className='container'>
            <p>Still not received an email? </p>
            <p>Try to register again. You may have given the wrong email. </p>
            <p>If you want to be able to use the same username, reset the registration :</p>
            <button onClick={handleResetRegister}>Click here to reset the registration</button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );
      default:
        return <Redirect to='/home' />;
    }
  }

  return isAuth ? <Redirect to='/home' /> : <>{renderSwitch()}</>;
}
