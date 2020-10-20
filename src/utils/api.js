import axios from 'axios';

export const SERVER_DOMAIN =
  process.env.NODE_ENV === 'production' ? 'https://api.belanjaku.id' : 'http://localhost:3000';

export const CLIENT_DOMAIN =
  process.env.NODE_ENV === 'production' ? 'https://belanjaku.id' : 'http://localhost:3006';

export const Api = axios.create({
  baseURL: SERVER_DOMAIN,
  timeout: 60000,
  headers: {
    version: '1.0.0',
  },
});

export const getErrorMessage = ({ message, response, request }) => {
  let msg = message;
  if (message === 'Network Error') {
    return 'networkError';
  }
  if (request) {
    const { _timedOut: timedOut } = request;
    if (timedOut) {
      return 'Tolong periksa koneksi internet Anda.';
    }
  }
  if (response && response.data && response.data.message) {
    if (response.status === 403 || response.status === 401) {
      return 'unAuthorized';
    }
    if (response.status === 426) {
      return 'needUpgrade';
    }
    if (Array.isArray(response.data.message)) {
      msg = response.data.message.reduce((acc, itr) => {
        if (itr.msg) {
          const separator = `${itr.param}: ${itr.msg}, `;
          return acc + separator;
        } else if (itr.message) {
          const separator = `${itr.message}, `;
          return acc + separator;
        }
        return itr.msg;
      }, '');
    } else {
      msg = response.data.message;
      return msg;
    }
  }
  return msg;
};
