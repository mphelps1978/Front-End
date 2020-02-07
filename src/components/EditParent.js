import React, {useState, useEffect} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import { Formik, Form } from "formik";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  name: yup.string(),
  username: yup.string(),
  email: yup.string().email('Invalid Email'),
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


const AddChild = props => {

const initialValues = {
  username: "",
  name: "",
  email: ""

}
;

  // console.log('EditParent Props: ' , props );
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newparent, setNewparent] = useState(initialValues)
console.log(newparent);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const FormSubmit = (e) => {
    e.preventDefault()
    console.log("Changing Parent Info", newparent);
    axiosWithAuth()
      .put(`/api/parent/${props.id}`, newparent)
        .then(res => {
          console.log("success", res);
          console.log("this is response from add child", res)
          handleClose()
        })
        .catch(error => console.log(error.response, "Didn't work"));

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          User Settings
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Edit Information
              </Typography>
              <Formik
                validationSchema={SignupSchema}
                onSubmit={(e)=> FormSubmit()}
              >
              {({ errors, handleChange, touched, status }) => (
                <Form className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={errors.name && touched.name}
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewparent({...newparent, name: e.target.value})}
                        value={newparent.name}
                        id="name"
                        label='name'
                        defaultValue={props.name}
                        autoFocus
                        helperText={
                          errors.name && touched.name
                            ? errors.name
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setNewparent({...newparent, username: e.target.value})}
                    value={newparent.username}
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="uname"
                    defaultValue={props.username}
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setNewparent({...newparent, email: e.target.value})}
                    value={newparent.email}
                    name="email"
                    label="email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    defaultValue={props.email}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={FormSubmit}
                    onSubmit={handleClose}
                  >
                    Save
                  </Button>

                </Form>
              )}
              </Formik>
            </div>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
};

export default AddChild;