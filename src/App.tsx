import React from 'react';
import './App.css';
import ClickPage from "./ClickPage";
import Navbar from "./Navbar";
import SigninRewardPage from "./SigninRewardPage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Router>
      <div className="App">
        <div className="content">
            <h2>WELCOME</h2>
            <Routes>
                <Route path="/collect-ticket" element={<ClickPage/>}></Route>
                <Route path="/sign-in Rewards" element={<SigninRewardPage/>}></Route>
            </Routes>
        </div>
          <Navbar></Navbar>
      </div>
      </Router>
  );
}
export default App;
