import { createBrowserRouter, RouterProvider } from 'react-router';

import { Home } from '@/pages/Home';
import { ResultDetail } from '@/pages/ResultDetail';
import { ResultHome } from '@/pages/ResultHome';
import { RollingList } from '@/pages/RollingList';
import { RollingWrite } from '@/pages/RollingWrite';

export const PATH = {
  HOME: () => '/',
  ROLLING_WRITE: (id: string) => `/rolling-write/${id}`,
  ROLLING_DETAIL: (id: string) => `/rolling-detail/${id}`,
  ROLLING_LIST: (id: string) => `/rolling-list/${id}`,
  RESULT_HOME: () => '/result',
  RESULT_DETAIL: () => '/result/:id',
};

const router = createBrowserRouter([
  {
    path: PATH.HOME(),
    element: <Home />,
  },
  {
    path: '/rolling-write',
    element: <RollingWrite />,
  },
  {
    path: '/rolling-list/:id',
    element: <RollingList />,
  },
  { path: PATH.RESULT_HOME(), element: <ResultHome /> },
  { path: PATH.RESULT_DETAIL(), element: <ResultDetail /> },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
