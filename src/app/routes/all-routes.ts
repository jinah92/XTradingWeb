import {
  authRoutePaths,
  homeRoutePaths,
  ideaRoutePaths,
  interestRoutePaths,
  marketRoutePaths,
  myPageRoutePaths,
  newsRoutePaths,
} from '@/app/routes';

export const allRoutes = {
  ...homeRoutePaths,
  ...authRoutePaths,
  ...ideaRoutePaths,
  ...interestRoutePaths,
  ...marketRoutePaths,
  ...myPageRoutePaths,
  ...newsRoutePaths,
};
