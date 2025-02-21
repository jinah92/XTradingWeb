import axios from 'axios';

import { responseErrorHandler, responseSuccessHandler, withAuthRequestHandler } from './handlers';

import type { CreateAxiosDefaults } from 'axios';

const createAxiosInstance = (config: CreateAxiosDefaults) => axios.create(config);

const defaultConfig: CreateAxiosDefaults = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'x-appkey': import.meta.env.VITE_APP_KEY,
  },
};

export const apiWithoutAuth = createAxiosInstance(defaultConfig);
export const apiWithAuth = createAxiosInstance(defaultConfig);

apiWithAuth.interceptors.request.use(withAuthRequestHandler);
apiWithAuth.interceptors.response.use(responseSuccessHandler, responseErrorHandler);
