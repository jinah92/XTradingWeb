import { IdeaListViewModel } from '@/entities/board';

import { BoardRepository } from '../api';

import type { Pagination } from '@shared';

export class BoardService {
  repository: typeof BoardRepository;

  constructor(repository: typeof BoardRepository) {
    this.repository = repository;
  }

  async getIdeas(pagination: Pagination) {
    const response = await this.repository.findIdeas(pagination);

    return new IdeaListViewModel(response);
  }
}

export default new BoardService(BoardRepository);
