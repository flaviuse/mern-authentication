import http from '../services/httpService';
// AUTH
export const postLogin = user => http.post('/auth/login', user);

export const sendResetPasswordLink = email =>
  http.post('auth/login/forgot', { email });

export const resetPassword = (password, token) =>
  http.post(`auth/login/reset/${token}`, { password });

export const postLogout = () => http.post('/auth/logout');

export const postRegister = user => http.post('/auth/register', user);

export const getConfirmation = token => http.get(`/auth/confirmation/${token}`);

export const resendConfirmation = email => http.post('/auth/resend', { email });

export const resetRegister = email =>
  http.post('/auth/register/reset', { email });

export const getUser = () => http.get('/user');
