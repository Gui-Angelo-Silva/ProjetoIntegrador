import AppRoutes from './routes';
import { useSession } from './pages/Session/index.jsx';
import { useEffect } from "react";

function App() {

  const { verifySession } = useSession();

  useEffect(() => {
    window.addEventListener('beforeunload', verifySession);

    return () => {
      window.removeEventListener('beforeunload', verifySession);
      verifySession(); // Executa ao desmontar o componente
    };
  }, []);

  return (
      <AppRoutes />
  );
}

export default App;