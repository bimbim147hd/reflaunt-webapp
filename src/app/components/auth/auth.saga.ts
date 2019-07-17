import * as _ from 'lodash';
import login from './login/login.saga';
import register from './register/register.saga';
import forgotPassword from './forgot-password/forgot-password.saga';
import resetPassword from './reset-password/reset-password.saga';

export default [...login, ...register, ...forgotPassword, ...resetPassword];
