import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/dashboard/home';

export default function RouteB() {
    return (
        <Routes>
            <Route path="principal" element={<Home />}></Route>

            {/* Rota catch-all para páginas inexistentes */}
            <Route path="*" element={<Navigate to="/pagina-inexistente" replace />} />
        </Routes>
    );
}
