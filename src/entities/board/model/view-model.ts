import { v4 as uuid } from 'uuid';

import { PaginationViewModel } from '@/entities/pagination';
import { timeAgo } from '@/shared';

import { FeedModel, IdeaModel } from './model';

import type {
  Idea,
  IdeaListResponse,
  BoardViewModelImpl,
  Feed,
  BoardListViewModelImpl,
  FeedListResponse,
} from './../types';

export class IdeaViewModel implements BoardViewModelImpl<IdeaModel> {
  model: IdeaModel;

  constructor(data: Idea) {
    this.model = new IdeaModel(data);
  }

  get id() {
    return this.model.id;
  }

  get data() {
    return this.model;
  }

  get isBlock() {
    return this.model.status.isBlock;
  }

  get isLike() {
    return this.model.status.isLike;
  }

  get isFollowed() {
    return this.model.status.isFollowed;
  }

  toTimeAgoDate(): string {
    const date = new Date(this.model.createdDate);
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return timeAgo(kstDate);
  }
}

export class FeedViewModel implements BoardViewModelImpl<FeedModel> {
  model: FeedModel;

  constructor(data: Feed) {
    this.model = new FeedModel(data);
  }

  get id() {
    return this.model.id;
  }

  get data() {
    return this.model;
  }

  get isBlock() {
    return this.model.status.isBlock;
  }

  get isLike() {
    return this.model.status.isLike;
  }

  get isFollowed() {
    return this.model.status.isFollowed;
  }

  toTimeAgoDate() {
    const date = new Date(this.model.createdDate);
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return timeAgo(kstDate);
  }
}

export class IdeaListViewModel implements BoardListViewModelImpl {
  items: IdeaViewModel[];
  pagination: PaginationViewModel;

  constructor({ boardList, ...pagination }: IdeaListResponse) {
    this.items = boardList.map(board => new IdeaViewModel(board));
    this.pagination = new PaginationViewModel(pagination);
  }

  get currentPage() {
    return this.pagination.currentPage;
  }
  get nextPage() {
    return this.pagination.nextPage;
  }
}

export class FeedListViewModel implements BoardListViewModelImpl {
  items: FeedViewModel[];
  pagination: PaginationViewModel;

  constructor({ feedList, ...pagination }: FeedListResponse) {
    this.items = feedList.map(board => new FeedViewModel(board));
    this.pagination = new PaginationViewModel(pagination);
  }

  get currentPage() {
    return this.pagination.currentPage;
  }
  get nextPage() {
    return this.pagination.nextPage;
  }
}
