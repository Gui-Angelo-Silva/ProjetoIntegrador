import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoute from './authRoute'
import Login from '../pages/login';
import RouteA from './acessRoute/routesA';
import RouteB from './acessRoute/routesB';
import RouteC from './acessRoute/routesC';
import RouteD from './acessRoute/routesD';

export default function AppRoutes() {
    return (
        <Router>
            <AuthRoute>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
                <RouteA />
                <RouteB />
                <RouteC />
                <RouteD />
            </AuthRoute>
        </Router>
    );
}
