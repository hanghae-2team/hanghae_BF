import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Routers } from './routers/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
      staleTime: 24 * 60 * 60 * 1000, // 24시간
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      throwOnError: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
