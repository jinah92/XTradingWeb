// 토큰 갱신 후 대기 중인 요청 재시도
export const onRefreshed = (token: string, subscribers: Array<(token: string) => void>) => {
  subscribers.forEach(callback => callback(token));
  subscribers.length = 0;
};

// 토큰 갱신 대기 큐에 추가
export const addRefreshSubscriber = (
  callback: (token: string) => void,
  subscribers: Array<(token: string) => void>,
) => {
  subscribers.push(callback);
};
