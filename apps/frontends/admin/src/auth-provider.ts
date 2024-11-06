import type { AuthProvider } from '@refinedev/core';

export const TOKEN_KEY = 'refine-auth';

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username as string);
      return Promise.resolve({
        success: true,
        redirectTo: '/',
      });
    }

    return Promise.resolve({
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    });
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return Promise.resolve({
      success: true,
      redirectTo: '/login',
    });
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve({
        authenticated: true,
      });
    }

    return Promise.resolve({
      authenticated: false,
      redirectTo: '/login',
    });
  },
  getPermissions: async () => Promise.resolve(null),
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve({
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/300',
      });
    }
    return Promise.resolve(null);
  },
  onError: async (error: Error) => {
    return Promise.resolve({ error });
  },
};
