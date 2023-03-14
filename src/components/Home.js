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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data
    fetch("https://srunning-octo-portfolio.vercel.app/api/v1/projects/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch(error => console.error(error));

  // Check local storage for token
  const token = localStorage.getItem("accessToken");
  if (token) {
    // Use token to get user data
    console.log(token)
    fetch("https://srunning-octo-portfolio.vercel.app/api/v1/user/", {
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
          <CardContent>
            <Typography variant="h5" component="h2">
              About - Osarenren (Osas) Isorae - <a href="https://www.linkedin.com/in/osarenren-isorae/" target="_blank" rel="noopener noreferrer">LinkedIn</a>

            </Typography>
            <Typography variant="body1" component="p">
            I am an AI software engineer, writer, and manager with a passion for revolutionizing education. My goal is to streamline the teaching process, enhance learning resources, and empower educators. I have extensive experience with scikit-image, spaCy, PyTorch, Scikit-Learn, TensorFlow, Keras, NumPy, Pandas, XGBoost, and Amazon S3. Additionally, I have worked as a Python Django Developer at eHealth4everyone and as a Lead Python Data Scientist at filerskeepers, where I gained experience with OCR, Google Trans API, marketing management, technical writing, software troubleshooting, DevOps, team management, data visualization, technical support, NLP, machine learning, API development, SEO, agile methodologies, GCP, SaaS, Selenium WebDriver, Flask, web scraping, data science, Django REST Framework, Postman API, AWS, and MongoDB. I am also well-versed in project management, diversity and inclusion, interview preparation, B2B marketing, social media marketing, and social engineering.
            </Typography>
            <Divider className={classes.projectsHeader} />
            <Typography
              variant="h5"
              component="h2"
              className={classes.projectsHeader}
            >
              Projects
            </Typography>
            <List>
              {projects &&
                projects.map((project) => (
                  <ListItem key={project.id}>
                    <ListItemAvatar>
                      <Avatar>{project.title.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    
                    <Link to={`/projects/${project.id}`}>
                      <ListItemText
                        primary={project.title}
                        secondary={
                          "From " +
                          new Date(project.start_date).toLocaleDateString() +
                          " to " +
                          new Date(project.end_date).toLocaleDateString()
                        }
                      />
                    </Link>
                  </ListItem>
                ))}
            </List>

            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
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
