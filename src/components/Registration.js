import React, { useState } from "react";
import axios from "axios"


const UserRegistration = props =>{

  const [parentUser, setParentUser] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });

  const [parentUsers, setParentUsers] = useState([]);

  const handleChanges = e => {
    setParentUser({...parentUser, [e.target.name]: e.target.value});
  }

  const submitForm = e => {
    e.preventDefault();
    addNewParentUser(parentUser);

    setParentUser({name: "", email: "", username: "", password: ""})
  };

  const addNewParentUser = user => {
    const newParentUser = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password
    }

    setParentUsers([...parentUsers, newParentUser]);
  };

  console.log ("These are Parent Users", parentUsers);

  return(

    <form onSubmit= {submitForm}>

    <label htmlFor="name">Name</label>
    <input 
      id="name" 
      name="name" 
      type="text"
      onChange={handleChanges}
      placeholder="Enter Name"
      value ={parentUser.name}
    />

    <label htmlFor="email">Email</label>
    <input 
      id="email" 
      name="email" 
      type="email"
      onChange={handleChanges}
      placeholder="Enter Email"
      value ={parentUser.email}
    />


    <label htmlFor="name">User Name</label>
    <input 
      id="username" 
      name="username" 
      type="text"
      onChange={handleChanges}
      placeholder="Enter User Name"
      value ={parentUser.username}
    />

    <label htmlFor="name">Password</label>
    <input 
      id="password" 
      name="password" 
      type="password"
      onChange={handleChanges}
      placeholder="Enter Password"
      value ={parentUser.password}
    />

    <button type="submit">Submit</button>

    </form>

  );


};

export default UserRegistration;