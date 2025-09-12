import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { Error } from '@/components/Error';
import { ProtectedRoute } from '@/components/ProtectedRoute';
// import { HobbySelect } from '@/pages/HobbySelect';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';
import { ResultDetail } from '@/pages/ResultDetail';
import { ResultHome } from '@/pages/ResultHome';
import { Splash } from '@/pages/Splash';
// import { Survey } from '@/pages/Survey';
// import { SurveyComplete } from '@/pages/SurveyComplete';

export const PATH = {
  SPLASH: () => '/',
  LOGIN: () => '/login',
  ROLLING_LIST: () => `/rolling-list/:id`,
  RESULT_HOME: () => '/result',
  RESULT_DETAIL: () => '/result/:id',
  SURVEY: () => '/survey',
  SURVEY_COMPLETE: () => '/survey-complete',
  HOBBY_SELECT: () => '/hobby-select',
  NOT_FOUND: () => '*',
};

const router = createBrowserRouter([
  {
    path: PATH.SPLASH(),
    element: <Splash />,
  },
  {
    path: PATH.LOGIN(),
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: PATH.RESULT_HOME(),
        element: (
          <ErrorBoundary fallback={<Error />}>
            <ResultHome />
          </ErrorBoundary>
        ),
      },
      {
        path: PATH.RESULT_DETAIL(),
        element: (
          <ErrorBoundary fallback={<Error />}>
            <ResultDetail />
          </ErrorBoundary>
        ),
      },
      // {
      //   path: PATH.SURVEY(),
      //   element: (
      //     <ErrorBoundary fallback={<Error />}>
      //       <Survey />
      //     </ErrorBoundary>
      //   ),
      // },
      // {
      //   path: PATH.SURVEY_COMPLETE(),
      //   element: (
      //     <ErrorBoundary fallback={<Error />}>
      //       <SurveyComplete />
      //     </ErrorBoundary>
      //   ),
      // },
      // {
      //   path: PATH.HOBBY_SELECT(),
      //   element: (
      //     <ErrorBoundary fallback={<Error />}>
      //       <HobbySelect />
      //     </ErrorBoundary>
      //   ),
      // },
    ],
  },
  {
    path: PATH.NOT_FOUND(),
    element: <NotFound />,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
