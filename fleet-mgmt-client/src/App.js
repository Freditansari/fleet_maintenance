import React from 'react';
import logo from './logo.svg';
import './App.css';
// import SideNav from './Components/SideNav'
import NavBar from './Components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Loginform from './Components/Login/Loginform'
import Dashboard from './Components/Dashboard/Dashboard'


function App() {
  return (
    <Router>
      <div className="App">
      <header >
        <NavBar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Loginform} />
      </header>
      <body>
        
      </body>
    </div>
    </Router>
    
  );
}

export default App;
