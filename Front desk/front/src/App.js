import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Register from './Register/register'
import Login from './Login/Login'
import Homepage from './Homepage/Homepage'
import M from './Homepage/M'
import Two from './Homepage/Two'
import Details from './Details/Details'
export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/register" exact element={<Register />}></Route>
                    <Route path="/login" exact element={<Login />}></Route>
                    <Route path="/" exact element={<Homepage />}>
                        <Route path="one" exact element={<M />}></Route>
                        <Route path="two/:columnName" exact element={<Two />}></Route>
                    </Route>
                    <Route path="details/:id" exact element={<Details />}></Route>
                </Routes>
            </Router>
        </div>
    )
}