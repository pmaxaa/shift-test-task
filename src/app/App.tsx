import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthPage } from '../pages/auth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthPage />
    </QueryClientProvider>
  );
}

export default App;
