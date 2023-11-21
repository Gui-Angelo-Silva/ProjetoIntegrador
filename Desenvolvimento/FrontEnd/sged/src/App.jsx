import AppRoutes from './routes';
import { useSession } from './pages/Session/index.jsx';
import { useEffect } from "react";

function App() {

  const { defaultSession } = useSession();

  useEffect(() => {
    defaultSession();
  }, []);

  return (
      <AppRoutes />
  );
}

export default App;