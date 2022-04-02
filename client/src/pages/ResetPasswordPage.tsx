import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Error } from "../components";
import { attemptResetPassword } from "../store/thunks/auth";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";

type ResetPasswordFormValues = {
  password: string;
};

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();
  const { serverError, handleServerError } = useServerError();

  const initialValues: ResetPasswordFormValues = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    const password = values.password;
    dispatch(attemptResetPassword(password, token)).catch(handleServerError);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <div className='container'>
            <Form className='form'>
              <div className='field'>
                <label htmlFor='password'>Password</label>
                <Field id='password' name='password' type='password' placeholder='Password' />
                <ErrorMessage name='password' component={Error} />
              </div>
              <button type='submit' disabled={!formik.dirty || !formik.isValid}>
                Reset password
              </button>
              {serverError && <Error>{serverError}</Error>}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
