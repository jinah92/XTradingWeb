export interface BoardViewModelImpl<T> {
  get id(): string;
  get data(): T;
  toTimeAgoDate(): string;
}

export interface BoardListViewModelImpl {
  get currentPage(): number;
  get nextPage(): number | null;
}
