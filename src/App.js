import React from 'react';
import FormikUserRegistrationForm from "./components/Registration"
import './App.css';
import Dashboard from './components/Dashboard';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login'
import PrivateRoute from './utils/PrivateRoute'
import SignUp from './components/SignUp';



function App() {
  return (
    <div className="App">

        <Router>
          <Route exact path = '/' component = {Login} />
            <Switch>
              <PrivateRoute exact path = '/dashboard' component = {Dashboard} />

            </Switch>
        </Router>

        <FormikUserRegistrationForm />
        {/* <SignUp/> */}
        

    </div>
  );
}

export default App;
