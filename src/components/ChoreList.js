import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { axiosWithAuth } from '../utils/axiosWithAuth'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  navpaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },
  fixedHeight: {
    height: 240,
  },
  fixedNavHeight: {
    height: 60,
  },
}));

// const choresArray = [
//   "Harry Potter",
//   "Luna Lovegood",
//   "Neville Longbottom",
//   "Hermione Granger",
//   "Ron Weasley",
//   "Ginny Weasley",
//   "Fred Weasley",
//   "George Weasley",
//   "Albus Dumbledore ",
//   "Aberforth Dumbledore ",
//   "Dudley Dursley ",
//   "Petunia Dursley ",
//   "Vernon Dursley",
//   "Cornelius Fudge",
//   "Rubeus Hagrid ",
//   "Viktor Krum ",
//   "Bellatrix Lestrange",
//   "Narcissa Malfoy",
//   "Draco Malfoy"
// ];

export const ChoreList = props => {
  const [choresList, setChoresList]= useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const id = localStorage.getItem('id')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedNavHeightPaper = clsx(classes.navpaper, classes.fixedNavHeight);

  useEffect(() => {
    axiosWithAuth()
    .get(`/api/chores/combined/${id}`)
    .then(res => {
      console.log(`Chores list from API: ${res}`);
    })
    .catch(err => console.log(err))


  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12} md={8} lg={9}>
            {
                !choresList ? (
                  <h2>No Chores Added</h2>
                ):(
                  choresList.map(chore => (
                    <ul key={chore}>{chore.name}</ul>
                    ))
                )

              }
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ChoreList
