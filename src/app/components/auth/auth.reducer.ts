import { combineReducers } from 'redux';
import { login } from './login/login.reducer';
import { Register } from './register/register.reducer';
import { ForgotPassword } from './forgot-password/forgot-password.reducer';
import { resetPassword } from './reset-password/reset-password.reducer';

export const Auth = combineReducers({
  login,
  Register,
  ForgotPassword,
  resetPassword
});
