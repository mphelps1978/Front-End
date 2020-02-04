import React, { useState, useEffect } from "react";
import axios from "axios"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";



const ChoreAdderForm = ({values, errors, touched, status}) => {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);

    status && setChores(chores => [...chores, status]);
  }, [status]);
  return (
    <div>
      <Form>
        <label htmlFor= "name">Chore:</label>
        <Field id="name" type="text" name="name" />
        {touched.name && errors.name && (
          <p>{errors.chores}</p>
        )}
        )}
        <label htmlFor= "description">Chore Description:</label>
        <Field id="description" type="textarea" name="description" />
        {touched.description && errors.description && (
          <p>{errors.description}</p>
        )}
        <label htmlFor= "child">Child Assigned:</label>
        <Field id="child" type="child" name="child" />
        {touched.child && errors.child && (
          <p >{errors.child}</p>
        )}
        <button type="submit">Assign Chore</button>

      </Form>
      {/* <Users users = {users}/> */}

      <div>
        {chores.map (chore =>(
          <ul key={chore.id}>
          <li>Chore: {chore.name}</li>
          <li>Description: {chore.description}</li>
          <li>Assigned To: {chore.child}</li>
          </ul>

        ))} 
      </div>
    </div>
  );
};
const FormikChoreAdderForm = withFormik({
  mapPropsToValues({name, description, child}) {

    return {
      name: "",
      description: "",
      child: ""
    };

  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    child: Yup.string().required(),

  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting! ", values);
    axios
      .post("https://choretracker01.herokuapp.com/api/auth/register", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data); 
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(ChoreAdderForm);
export default FormikChoreAdderForm;
