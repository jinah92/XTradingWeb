import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// ApiResponse Class
type apiResponse<T> = {
  message: string;
  result: T;
};

const axiosInstance = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "x-appkey": import.meta.env.VITE_APP_KEY,
  },
});

// 토큰 관리 인터페이스
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// AxiosRequestConfig 확장하여 headers가 반드시 존재한다고 타입 지정
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    [key: string]: string;
  };
}

let tokens: Tokens | null = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshTokenKey") || "",
};

// 토큰 갱신 요청 상태
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// 토큰 갱신 후 대기 중인 요청 재시도
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 대기 큐에 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 응답 인터셉터: 401 에러 처리 및 토큰 갱신
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<apiResponse<Tokens>>) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & { _retry?: boolean };

    // 401 에러 처리
    if (error.response && error.response.status === 401) {
      if (originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          // 이미 갱신 요청 중이면 대기
          return new Promise((resolve) => {
            addRefreshSubscriber((newToken: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        // 새로운 토큰 갱신 요청 처리
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Refresh Token을 사용하여 새로운 Access Token 요청
          const response = await axios.post<apiResponse<Tokens>>(
            "/api/auth/reissue-access-token", // 실제 토큰 갱신 API URL
            {
              refreshToken: tokens?.refreshToken,
            }
          );

          // 새 토큰 저장
          tokens = response.data.result;
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);

          isRefreshing = false;
          onRefreshed(tokens.accessToken);

          // 원래 요청 재시도
          originalRequest.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.clear();
          window.location.href = "/login"; // 토큰 갱신 실패 시 로그인 화면으로 리디렉션
          return Promise.reject(refreshError);
        }
      }
    }

    // 403, 500 등의 다른 에러 처리
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        console.log("403 error");
      } else if (status === 500) {
        console.log("500 error");
      }
    }

    return Promise.reject(error);
  }
);


// 요청 인터셉터 추가
axiosInstance.interceptors.request.use((config) => {
  // 로그인 상태 확인 (예: 토큰이 로컬 스토리지에 있는지 확인)
  const token = localStorage.getItem("accessToken"); // 토큰 저장 위치에 따라 조정

  // 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 추가
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
