import { IdeaModel } from '@/entities/board/model';

export interface IdeaViewModelImpl {
  get id(): string;
  get data(): IdeaModel;
  toTimeAgoDate(): string;
}

export interface IdeaListViewModelImpl {
  get currentPage(): number;
  get nextPage(): number | null;
}
