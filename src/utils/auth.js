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
        if (now > token.exp || !auth.is_authorized) {
          return false;
        }
        break;
      case 'confirm':
        token = auth.confirm_token;
        if (now > token.exp) {
          return false;
        }
        break;
      case 'register':
        token = auth.register_token;
        if (now > token.exp) {
          return false;
        }
        break;
      default:
        return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
