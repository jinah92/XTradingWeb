import { createBrowserRouter } from 'react-router-dom';

import { authRoute, homeRoute, ideaRoute, interestRoute, marketRoute, myPageRoute, newsRoute } from '@/app/routes';
import { BoardLayout } from '@/layout/BoardLayout';
import MainLayout from '@/layout/MainLayout';
import NewsLayout from '@/layout/NewsLayout';
import PrivateRoute from '@/router/PrivateRoute';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      homeRoute,
      interestRoute,
      ...marketRoute,
      {
        element: <BoardLayout />,
        children: [...ideaRoute],
      },
      {
        element: <NewsLayout />,
        children: [...newsRoute],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [myPageRoute],
  },
  {
    children: [...authRoute],
  },
]);
