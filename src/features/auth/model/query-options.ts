import { AuthEntity } from '@/entities';

import type { LoginParamsByEmail } from '@/entities/auth/types';
import type { UseMutationOptions } from '@tanstack/react-query';

export const options = {
  rootKey: 'auth',
  postLoginByEmail: () =>
    ({
      mutationKey: [options.rootKey, 'loginByEmail'],
      mutationFn: async params => AuthEntity.authService.loginByEmail(params),
    }) as UseMutationOptions<AuthEntity.AuthViewModel, Error, LoginParamsByEmail>,
};
