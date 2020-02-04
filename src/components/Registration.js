import React, { useState, useEffect } from "react";
import axios from "axios"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import cors from "cors";



const UserRegistrationForm = ({values, errors, touched, status}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);

    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div>
      <Form>
        <label htmlFor= "name">Name:</label>
        <Field id="name" type="text" name="name" />
        {touched.name && errors.name && (
          <p>{errors.name}</p>
        )}
        <label htmlFor= "email">Email:</label>
        <Field id="email" type="email" name="email" />
        {touched.email && errors.email && (
          <p>{errors.email}</p>
        )}
        <label htmlFor= "username">UserName:</label>
        <Field id="username" type="text" name="username" />
        {touched.username && errors.username && (
          <p>{errors.username}</p>
        )}
        <label htmlFor= "password">Password:</label>
        <Field id="password" type="password" name="password" />
        {touched.password && errors.password && (
          <p >{errors.password}</p>
        )}
        <button type="submit">Submit</button>

      </Form>
      {/* <Users users = {users}/> */}

      <div>
        {users.map (user =>(
          <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
          </ul>


        ))}

        ))} 

      </div>
    </div>
  );
};
const FormikUserRegistrationForm = withFormik({
  mapPropsToValues({name, email, username, password}) {

  return {
    name: "",
    email: "",
    username: "",
    password: ""
  };

  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Your Name is required to continue"),
    email: Yup.string().email('Invalid Email').required("Need an email to find you"),
    username: Yup.string().required("Your UserName is required to continue"),
    password: Yup.string().required(),

  }),
  handleSubmit(values, { setStatus, resetForm }) {

    this.preventDefault()


    console.log("submitting! ", values);
    axios
      .post("https://choretracker01.herokuapp.com/api/auth/register", values)
      .then(res => {
        console.log("success", res);

        setStatus(res.data);
        localStorage.setItem(res.data.token)  // Store Access Token
        this.props.history.push('/dashboard') // Redirect to Dashboard

        setStatus(res.data); 
        resetForm();

      })
      .catch(err => console.log(err.response));
  }
})(UserRegistrationForm);
export default FormikUserRegistrationForm;
