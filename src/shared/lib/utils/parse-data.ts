import CryptoJS from 'crypto-js';

export function splitValue(value: number, divisor: number) {
  const result = [];

  while (value > 0) {
    const part = Math.min(value, divisor); // 현재 값과 나눌 값을 비교하여 작은 값을 선택
    result.push(part); // 배열에 추가
    value -= part; // 남은 값 계산
  }

  return result;
}

export const hashFunction = (password: string) => {
  const hash = CryptoJS.SHA256(password);
  return hash.toString(CryptoJS.enc.Hex);
};
