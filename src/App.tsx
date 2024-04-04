import React from 'react';
import './App.css';
import ClickPage from "./ClickPage";
import Navbar from "./Navbar";
import SigninRewardPage from "./SigninRewardPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <Router>
      <div className="App">
        <div className="content">
            <h2>WELCOME</h2>
            <Routes>
                <Route path="test2/collect-ticket" element={<ClickPage/>}></Route>
                <Route path="test2/sign-in Rewards" element={<SigninRewardPage/>}></Route>
            </Routes>
        </div>
          <Navbar></Navbar>
      </div>
      </Router>
  );
}
export default App;
