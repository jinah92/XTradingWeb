import { type Pagination } from '@shared';

import { FeedListViewModel, IdeaListViewModel } from '@/entities/board';

import { BoardRepository } from '../api';

import type { CreateBoardRequest, CreateFeedRequest } from '@/entities/board/types';

export class BoardService {
  repository: typeof BoardRepository;

  constructor(repository: typeof BoardRepository) {
    this.repository = repository;
  }

  async getIdeas(params: Pagination) {
    const response = await this.repository.findIdeas(params);

    return new IdeaListViewModel(response);
  }

  async getFeeds(params: Pagination & { type?: string; code?: string }) {
    const response = await this.repository.findFeeds(params);

    return new FeedListViewModel(response);
  }

  async createIdea(params: CreateBoardRequest) {
    const response = await this.repository.createIdea(params);

    return response;
  }

  async createFeed(params: CreateFeedRequest) {
    const response = await this.repository.createFeed(params);

    return response;
  }
}

export default new BoardService(BoardRepository);
