import React from 'react';
import { makeStyles } from 'tss-react/mui'
import { Typography } from "@mui/material";
import RegisterForm from './RegisterForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
}));

const Register = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <RegisterForm />
    </div>
  );
};

export default Register;
