import React from 'react';
import logo from './logo.svg';
import './App.css';
// import SideNav from './Components/SideNav'
import NavBar from './Components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Loginform from './Components/Login/Loginform'
import Dashboard from './Components/Dashboard/Dashboard'
import NewUserForm from './Components/Users/NewUserForm'
import NewVehicle from './Components/Vehicles/NewVehicle'


function App() {
  return (
    <Router>
      <div className="App">
      <header >
        <NavBar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Loginform} />
        <Route exact path="/newuser" component={NewUserForm} />
        <Route exact path="/newVehicle" component={NewVehicle} />
      </header>
      <body>
        
      </body>
    </div>
    </Router>
    
  );
}

export default App;
