import { v4 as uuid } from 'uuid';

import { PaginationViewModel } from '@/entities/pagination';
import { timeAgo } from '@/shared';

import { IdeaModel } from './model';

import type { Idea, IdeaListResponse, IdeaListViewModelImpl, IdeaViewModelImpl } from './../types';

export class IdeaViewModel implements IdeaViewModelImpl {
  model: IdeaModel;
  private _id: string;

  constructor(data: Idea) {
    this.model = new IdeaModel(data);
    this._id = uuid();
  }

  get id() {
    return this._id;
  }

  get data() {
    return this.model;
  }

  toTimeAgoDate(): string {
    const date = new Date(this.model.createdDate);
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return timeAgo(kstDate);
  }
}

export class IdeaListViewModel implements IdeaListViewModelImpl {
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
