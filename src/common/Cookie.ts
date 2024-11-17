import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: Record<string, unknown>) => {
  return cookies.set(name, value, { ...options });
}

export const getCookie = (name: string) => {
  return cookies.get(name);
}
