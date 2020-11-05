import { store } from '../redux';

export const isAuthenticated = (type) => {
  try {
    if (!type) {
      return false;
    }

    const { auth } = store.getState();
    const now = new Date().getTime() / 1000;

    let token;
    switch (type) {
      case 'login':
        token = auth.login_token;
        if (!token || now > token.exp || !auth.is_authorized) {
          return false;
        }
        return true;
      case 'register':
        token = auth.register_token;
        break;
      case 'reset':
        token = auth.reset_token;
        break;
      case 'confirm_login':
        token = auth.confirm_login_token;
        break;
      case 'confirm_register':
        token = auth.confirm_register_token;
        break;
      case 'confirm_reset':
        token = auth.confirm_reset_token;
        break;
      default:
        return false;
    }

    if (!token || now > token.exp) return false;

    return true;
  } catch (err) {
    return false;
  }
};
