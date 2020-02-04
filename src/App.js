import React from 'react';
import FormikUserRegistrationForm from "./components/Registration"
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
        <FormikUserRegistrationForm />
        <Dashboard/>
    </div>
  );
}

export default App;
