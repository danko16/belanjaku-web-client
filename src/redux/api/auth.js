import { Api } from '../../utils/api';

export default Object.freeze({
  register: (payload) =>
    Api.post('/user/auth/register', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  confirmOtp: (payload, token) =>
    Api.post('/user/auth/confirm-otp', payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-confirm-token': token,
      },
    }),
  registerComplete: (payload, token) =>
    Api.post('/user/auth/register-complete', payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-register-token': token,
      },
    }),
});
