import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
export default function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>

      <hr />

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true, true)}></Route>
        <Route exact path="/login" component={Auth(LoginPage, false, true)}></Route>
        <Route exact path="/register" component={Auth(RegisterPage, false)}></Route>
        {/* <Route exact path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/dashboard" component={Dashboard}></Route> */}
      </Switch>
    </div>
  </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}