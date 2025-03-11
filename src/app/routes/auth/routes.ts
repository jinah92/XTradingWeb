import { authRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const authRoute: RouteObject[] = [
  {
    path: authRoutePaths.login.path,
    async lazy() {
      const LoginPage = await import('@/pages/auth/Login');
      return { Component: LoginPage.default };
    },
  },
  {
    path: authRoutePaths.signUp.path,
    async lazy() {
      const SignUpPage = await import('@/pages/auth/SignUp');
      return { Component: SignUpPage.default };
    },
  },
];
