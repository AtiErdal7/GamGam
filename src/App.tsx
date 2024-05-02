import React from 'react';
import {useEffect} from "react";
import './App.css';
import ClickPage from "./ClickPage";
import Navbar from "./Navbar";
import ProfilePage from "./ProfilePage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import HotDeals from "./HotDeals";
import BoostPage from "./BoostPage";

function App() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

    }, []);
  return (
      <Router>
      <div className="App">
        <div className="content">
            <Routes>
                <Route path="/" element={<ClickPage/>}></Route>
                <Route path="/profile" element={<ProfilePage/>}></Route>
                <Route path="/deals" element={<HotDeals></HotDeals>}></Route>
                <Route path="/boosts" element={<BoostPage></BoostPage>}></Route>
            </Routes>
        </div>
          <Navbar></Navbar>
      </div>
      </Router>
  );
}
export default App;
