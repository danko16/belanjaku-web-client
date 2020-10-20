import { Api } from '../../utils/api';

export default Object.freeze({
  register: (payload) =>
    Api.post('/register', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  confirmOtp: (payload, token) =>
    Api.post('/confirm-otp', payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-register-token': token,
      },
    }),
  registerComplete: (payload, token) =>
    Api.post('/register-complete', payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-register-complete-token': token,
      },
    }),
});
