import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login/login'
import Home from './Home/Home'
import Shouye from './Home/Nestedcomponents/Shouye'
import One from  './Home/Nestedcomponents/Add'
import Management from './Home/Nestedcomponents/Management'
import Newsadd from './Home/Nestedcomponents/Newsadd'
import NewsManagement from './Home/Nestedcomponents/NewsManagement'
import Newsquery from './Home/Nestedcomponents/Newsquery'
import Xiugai from './Home/Nestedcomponents/lanmuxiugai'
import XiugaiA from './Home/Nestedcomponents/newxiugai'
import XiugaiB from './Home/Nestedcomponents/Newsqueryxiugai'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />}></Route>
                <Route path="/home" exact element={<Home />}>
                    <Route path="shou" exact element={<Shouye />}></Route>
                    <Route path="one" exact element={<One />}></Route>
                    <Route path="management" exact element={<Management />}></Route>
                    <Route path="newsadd" exact element={<Newsadd />}></Route>
                    <Route path="newsManagement" exact element={<NewsManagement />}></Route>
                    <Route path="newsquery" exact element={<Newsquery />}></Route>

                    <Route path="xiugai/:id/:name" exact element={<Xiugai/>}></Route>
                    <Route path="xiugai2/:newid/:title/:columnid" exact element={<XiugaiA/>}></Route>
                    <Route path="xiugai3/:newid" exact element={<XiugaiB/>}></Route>
                </Route>
            </Routes>
        </Router>
    );
}