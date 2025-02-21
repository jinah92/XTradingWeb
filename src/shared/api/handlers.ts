import { getCookie, setCookie } from '@/common/Cookie';
import type { ApiResponse, CustomAxiosRequestConfig, Token } from '@shared/types';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { addRefreshSubscriber, onRefreshed } from './utils';
import { apiWithAuth } from './instances';

// 토큰 갱신 요청 상태
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

export const withAuthRequestHandler = (request: InternalAxiosRequestConfig) => {
  const accessToken = getCookie('accessToken');

  // 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 추가
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
};

export const responseSuccessHandler = async (response: AxiosResponse) => response;
export const responseErrorHandler = async ({ status, ...response }: AxiosResponse) => {
  const requestConfig = response.config as CustomAxiosRequestConfig & { _retry?: boolean };
  if (status === 401) {
    if (requestConfig && !requestConfig._retry) {
      if (isRefreshing) {
        // 이미 갱신 요청 중이면 대기
        return new Promise(resolve => {
          addRefreshSubscriber((newToken: string) => {
            requestConfig.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(apiWithAuth(requestConfig));
          }, refreshSubscribers);
        });
      }

      requestConfig._retry = true;
      isRefreshing = true;

      try {
        const { data } = await apiWithAuth.post<ApiResponse<Token>>(`/api/auth/reissue-access-token`, {
          userId: getCookie('userId'),
          refreshTokenKey: getCookie('refreshToken'),
        });

        // 새 토큰 저장
        const { accessToken } = data.result;

        setCookie('accessToken', accessToken, {
          path: '/',
          secure: '/',
        });

        isRefreshing = false;
        onRefreshed(accessToken, refreshSubscribers);

        // 원래 요청 재시도
        requestConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        return apiWithAuth(requestConfig);
      } catch (refreshError) {
        isRefreshing = false;
        window.location.href = '/login'; // 토큰 갱신 실패 시 로그인 화면으로 리디렉션
        return Promise.reject(refreshError);
      }
    }
  }
  return Promise.reject(response);
};
