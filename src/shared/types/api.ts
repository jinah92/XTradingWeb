import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  message: string;
  result: T;
}

// 토큰 관리 인터페이스
export interface Token {
  accessToken: string;
}

// AxiosRequestConfig 확장하여 headers가 반드시 존재한다고 타입 지정
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    [key: string]: string;
  };
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export interface PaginationResponse {
  last: boolean;
  pageable: Pagination;
  totalElements: number;
}
