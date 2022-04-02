import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { attemptLogin } from "../store/thunks/auth";
import { Error } from "../components";
import { Credentials } from "src/store/actions/user";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";

type LoginFormValues = Credentials;

export default function LoginPage() {
  const { serverError, handleServerError } = useServerError();

  const dispatch = useAppDispatch();

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(50).required("Required"),
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(attemptLogin(values)).catch(handleServerError);
  };

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
                <label htmlFor='username'>Username</label>
                <Field id='username' name='username' type='text' placeholder='Username' />
                <ErrorMessage name='username' component={Error} />
              </div>
              <div className='field'>
                <label htmlFor='password'>Password</label>
                <Field id='password' name='password' type='password' placeholder='Password' />
                <ErrorMessage name='password' component={Error} />
              </div>
              <div>
                <Link to='/login/forgot'>Forgot your password?</Link>
              </div>
              <button type='submit' disabled={!formik.dirty || !formik.isValid}>
                Login
              </button>
              {serverError && <Error>{serverError}</Error>}
            </Form>
            <b>Or</b>
            <Link to='/register'>Sign Up</Link>
          </div>
        );
      }}
    </Formik>
  );
}
