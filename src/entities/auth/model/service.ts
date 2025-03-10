import { AuthRepository } from '@/entities/auth/api';
import { AuthViewModel } from '@/entities/auth/model/view-model';

import type { LoginParamsByEmail } from '@/entities/auth/types';

class AuthService {
  repository: typeof AuthRepository;

  constructor(repository: typeof AuthRepository) {
    this.repository = repository;
  }

  async loginByEmail(params: LoginParamsByEmail) {
    const createdUser = await this.repository.authEmailLogin(params);

    return new AuthViewModel(createdUser);
  }
}

export default new AuthService(AuthRepository);
