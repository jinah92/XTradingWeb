export interface BoardViewModelImpl<T> {
  get id(): string;
  get data(): T;
  get isBlock(): boolean;
  get isLike(): boolean;
  get isFollowed(): boolean;
  toTimeAgoDate(): string;
}

export interface BoardListViewModelImpl {
  get currentPage(): number;
  get nextPage(): number | null;
}
