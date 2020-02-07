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
import {ChildrenList} from './ChildrenList';


import { Formik, Form } from "formik";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  description: yup.string().required("This field is required."),
  child: yup.string().required("This field is required."),
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

 const initialValues={
  name: "",
  description: ""

}

const ChoreAdder = props => {
  const classes = useStyles();
  const [chores, setChores] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const id = localStorage.getItem('id');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const FormSubmit = () => {
    console.log("These are values", chores);
    axiosWithAuth()
      .post(`/api/chores/${id}`, chores)
        .then(res => {
          // console.log("success", res);
          // console.log("this is response data", res.data)
          // console.log("data imported from children list", ChildrenList.data)
          setOpen(false);
        })
        .catch(error => console.log(error.response, "Didn't work"));

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <button type="button" onClick={handleOpen}>
          ADD CHORE
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
                Add Chore
              </Typography>
              <Formik

                validationSchema={SignupSchema}
                onSubmit={FormSubmit}
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
                        onChange={(e) => setChores({...chores, name: e.target.value})}
                        value={chores.name}
                        id="name"
                        label="Name of Chore"
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
                        error={errors.description && touched.description}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setChores({...chores, description: e.target.value})}
                        value={chores.description}
                        id="description"
                        label="description"
                        name="description"
                        autoComplete="description"
                        multiline
                        rowsMax="4"
                        helperText={
                          errors.description && touched.description
                            ? errors.description
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
                    onSubmit={handleClose}>
                    Add Chore
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

export default ChoreAdder;