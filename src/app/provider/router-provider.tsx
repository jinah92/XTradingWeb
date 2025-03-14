import { RouterProvider as ReactRouterProvider } from 'react-router-dom';

import { router } from '@/app/routes';

export const RouterProvider = () => <ReactRouterProvider router={router} />;
