
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import State from '../src/pages/State'
import City from '../src/pages/City'
import TypeUser from '../src/pages/TypeUser'
import User from '../src/pages/User'
import Registration from './pages/Registration'
import Document from './pages/Document'

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={ <Login /> }></Route>
                <Route path="/home" element={ <Home /> }></Route>
                <Route path="/state" element={ <State /> }></Route>
                <Route path="/city" element={ <City /> }></Route>
                <Route path="/typeuser" element={ <TypeUser /> }></Route>
                <Route path="/user" element={ <User /> }></Route>
                <Route path="/registration" element={ <Registration /> }></Route>
                <Route path="/document" element={ <Document /> }></Route>
            </Routes>
        </Router>
    )
}