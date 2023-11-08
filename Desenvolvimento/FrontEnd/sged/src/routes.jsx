import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import City from './pages/City'
import State from './pages/State'
import Login from './pages/Login'

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={ <Login /> }></Route>
                <Route path="/city" element={ <City /> }></Route>
                <Route path="/state" element={ <State /> }></Route>
                <Route path="/home" element={ <Home /> }></Route>
            </Routes>
        </Router>
    )
};