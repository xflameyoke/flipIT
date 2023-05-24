import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupWorker } from 'msw';
import { handlers } from 'mocks';
import { Flashcards, AddFlashcard, EditFlashcard } from 'pages';
import { BaseLayout } from 'components';

if (process.env.NODE_ENV === 'development') {
  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: 'bypass'
  });
  axios.defaults.baseURL = '/';
}

const queryClient = new QueryClient();

export const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path='/' element={<Flashcards />} />
        <Route path='/addFlashcard' element={<AddFlashcard />} />
        <Route path='/:id' element={<EditFlashcard />} />
      </Route>
    </Routes>
  </QueryClientProvider>
);
