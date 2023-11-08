
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
<<<<<<< HEAD:Desenvolvimento/FrontEnd/sged/routes.jsx
import Home from './src/pages/Home'
import City from './src/pages/City'
import State from './src/pages/State'
import Login from './src/pages/Login'
import User from './src/pages/User'
=======
import Home from './pages/Home'
import City from './pages/City'
import State from './pages/State'
import Login from './pages/Login'
>>>>>>> b5e67ad9697460ee1a0bb06982625e1ceb9d8f80:Desenvolvimento/FrontEnd/sged/src/routes.jsx

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={ <Login /> }></Route>
                <Route path="/city" element={ <City /> }></Route>
                <Route path="/state" element={ <State /> }></Route>
<<<<<<< HEAD:Desenvolvimento/FrontEnd/sged/routes.jsx
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/user" element={ <User /> }></Route>
=======
                <Route path="/home" element={ <Home /> }></Route>
>>>>>>> b5e67ad9697460ee1a0bb06982625e1ceb9d8f80:Desenvolvimento/FrontEnd/sged/src/routes.jsx
            </Routes>
        </Router>
    )
}