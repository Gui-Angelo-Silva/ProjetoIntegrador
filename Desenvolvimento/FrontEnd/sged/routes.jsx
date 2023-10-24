import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './src/pages/Home'
import City from './src/pages/City'
import State from './src/pages/State'
import Login from './src/pages/Login'

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={ <Home /> }></Route>
                <Route path="/city" element={ <City /> }></Route>
                <Route path="/state" element={ <State /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
            </Routes>
        </Router>
    )
};