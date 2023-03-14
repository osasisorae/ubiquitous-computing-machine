import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import {
    Button,
  } from "@mui/material";
  
import { Link } from 'react-router-dom';

const Detail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => {
    axios.get(`https://srunning-octo-portfolio.vercel.app/api/v1/projects/${projectId}/`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectId]);

  return (
    <div>
      {project ? (
        <Card>
          <CardContent>
            <Typography variant="h4">{project.title}</Typography>
            <Typography variant="body1">{project.description}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}

            <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Back
          </Button>
    </div>
  );
};

export default Detail;
