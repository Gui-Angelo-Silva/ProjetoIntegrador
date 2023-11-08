
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './src/pages/Home'
import City from './src/pages/City'
import State from './src/pages/State'
import Login from './src/pages/Login'
import User from './src/pages/User'

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={ <Home /> }></Route>
                <Route path="/city" element={ <City /> }></Route>
                <Route path="/state" element={ <State /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/user" element={ <User /> }></Route>
            </Routes>
        </Router>
    )
}