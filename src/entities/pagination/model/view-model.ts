import type { PaginationResponse } from '@/shared';

export class PaginationViewModel {
  _currentPage: number;
  pageSize: number;
  last: boolean;
  total: number;

  constructor(data: PaginationResponse) {
    this._currentPage = data.pageable.pageNumber;
    this.pageSize = data.pageable.pageSize;
    this.last = data.last;
    this.total = data.totalElements;
  }

  get currentPage() {
    return this._currentPage;
  }

  get nextPage() {
    if (this.last) {
      return null;
    }
    return this.currentPage + 1;
  }
}
