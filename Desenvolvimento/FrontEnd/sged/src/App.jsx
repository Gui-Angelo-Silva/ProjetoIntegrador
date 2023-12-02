import AppRoutes from './routes';
import { useSession } from './pages/Session/index.jsx';
import { useEffect } from "react";

function App() {

  const { defaultSession, getSession } = useSession();

  useEffect(() => {
    const VerifySession = () => {
      const user = getSession();
      if (user === null) {
        defaultSession();
      }
    };

    window.addEventListener('beforeunload', VerifySession);

    return () => {
      window.removeEventListener('beforeunload', VerifySession);
      VerifySession(); // Executa ao desmontar o componente
    };
  }, []);

  return (
      <AppRoutes />
  );
}

export default App;