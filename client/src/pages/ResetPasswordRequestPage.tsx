import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Error } from "../components";
import { attemptSendResetPasswordLink } from "../store/thunks/auth";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";

type FormValues = {
  email: string;
};

export default function ResetPasswordRequestPage() {
  const dispatch = useAppDispatch();
  const { serverError, handleServerError } = useServerError();
  const [isSubmited, setIsSubmited] = useState(false);

  const initialValues: FormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
  });

  const onSubmit = (values: FormValues) => {
    const email = values.email;
    dispatch(attemptSendResetPasswordLink(email))
      .then(() => {
        setIsSubmited(true);
      })
      .catch(handleServerError);
  };

  return isSubmited ? (
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
                {/* @ts-ignore */}
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
