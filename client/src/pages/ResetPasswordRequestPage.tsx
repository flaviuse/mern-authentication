import { useState } from "react";
import * as Yup from "yup";
import { Error } from "../components";
import { attemptSendResetPasswordLink } from "../store/thunks/auth";
import { useServerError } from "src/hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type ResetPasswordRequestFormValues = {
  email: string;
};

export default function ResetPasswordRequestPage() {
  const navigate = useNavigate();
  const { serverError, handleServerError } = useServerError();
  const [isSubmited, setIsSubmited] = useState(false);

  const initialValues: ResetPasswordRequestFormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequestFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: ResetPasswordRequestFormValues) => {
    const email = values.email;
    attemptSendResetPasswordLink(email, navigate)
      .then(() => {
        setIsSubmited(true);
      })
      .catch(handleServerError);
  };

  return isSubmited ? (
    <div className='container'>
      <p>
        A reset link has been sent to your email. <b>You have 12 hours to reset your password.</b>
        It can take up to 15 min to receive our email.
      </p>
    </div>
  ) : (
    <div className='container'>
      <p>We will send you a reset link on the following email :</p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input {...register("email")} id='email' type='email' placeholder='Email' />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <button type='submit'>Send reset link</button>
        {serverError && <Error>{serverError}</Error>}
      </form>
    </div>
  );
}
