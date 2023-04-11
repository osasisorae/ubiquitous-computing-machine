import React, { useState, useEffect } from "react";
import { makeStyles } from 'tss-react/mui'
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  cardHeader: {
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  projectsHeader: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();
  const history = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    // Check local storage for token
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Use token to get user data
      fetch("http://127.0.0.1:8000/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch(error => console.error(error));
    }
  }, []);

  const handleLogout = () => {
    // Remove token from local storage and set user state to null
    localStorage.removeItem('accessToken');
    history('/login');
  };

  const handleLessonPlan = () => {
    history("/glp");
  };

  return (
    <div className={classes.root}>
      {user ? (
        <Card>
          <CardHeader
            className={classes.cardHeader}
            avatar={<Avatar>{user.username.charAt(0)}</Avatar>}
            title={user.first_name + " " + user.last_name}
            subheader={user.email}
          />
          <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          <CardContent>
            <Typography variant="h5" component="h2">
              Welcome to alis, the robot teacher.
            </Typography>
            <Typography variant="body1" component="p">
              Supports education by teaching both teachers and students, grading assignments, providing lesson plans and resources, and handling administrative tasks.
            </Typography>
            <Divider className={classes.projectsHeader} />
            <Typography
              variant="h5"
              component="h2"
              className={classes.projectsHeader}
            >
              About the Builders
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>OI</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Osarenren Isorae"
                  secondary="Lead Software Engineer"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>YL</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Yanru Liu"
                  secondary="Lead Product Designer"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>YL</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Yujie Liu"
                  secondary="Lead UX Designer"
                />
              </ListItem>
            </List>
          </CardContent>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Generate Lesson Plan - Beta!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLessonPlan}>
              Start
            </Button>
          </CardContent>          
          </Card>

          
      ) : (
        <>
        <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
}

export default Home;