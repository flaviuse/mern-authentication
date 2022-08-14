import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Error } from "../components";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
} from "../store/thunks/auth";
import { User } from "src/store/actions/user";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type RegisterFormValues = User;

enum RegisterFormStep {
  Register,
  Resend,
  Reset,
}

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { serverError, handleServerError } = useServerError();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    dispatch(attemptRegister(values))
      .then(() => {
        setEmail(values.email);
        setRegisterStep(RegisterFormStep.Resend);
      })
      .catch(handleServerError);
  };

  const handleResendEmail = () => {
    if (!email) return;

    dispatch(attemptResendConfirmation(email, navigate))
      .then(() => {
        setRegisterStep(RegisterFormStep.Reset);
      })
      .catch(handleServerError);
  };

  const handleResetRegister = () => {
    if (!email) return;

    dispatch(attemptResetRegister(email, navigate))
      .then(() => {
        setRegisterStep(RegisterFormStep.Register);
      })
      .catch(handleServerError);
  };

  function renderSwitch() {
    switch (registerStep) {
      case RegisterFormStep.Register:
        return (
          <div className='container'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <div className='field'>
                <label htmlFor='email'>Email</label>
                <input {...register("email")} id='email' type='email' placeholder='Email' />
                {errors.email && <Error>{errors.email.message}</Error>}
              </div>
              <div className='field'>
                <label htmlFor='username'>Username</label>
                <input {...register("username")} id='username' type='text' placeholder='Username' />
                {errors.username && <Error>{errors.username.message}</Error>}
              </div>
              <div className='field'>
                <label htmlFor='password'>Password</label>
                <input
                  {...register("password")}
                  id='password'
                  type='password'
                  placeholder='Password'
                />
                {errors.password && <Error>{errors.password.message}</Error>}
              </div>

              <button type='submit'>Signup</button>
              {serverError && <Error>{serverError}</Error>}
            </form>
          </div>
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
        return <Navigate to='/home' replace />;
    }
  }

  return <>{renderSwitch()}</>;
}
