import AppRoutes from './routes';
import { SessionProvider } from './pages/Session/index.jsx';

function App() {
  return (
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  );
}

export default App;