import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, TextField, Button } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/chat/messages')
      .then((response) => {
        setChatMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSend = () => {
    axios.post('http://localhost:8000/api/chat/send', { message })
      .then((response) => {
        setChatMessages([...chatMessages, response.data]);
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Typography variant="h4">Chat</Typography>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {chatMessages.map((chatMessage) => (
          <Card key={chatMessage.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="body1">{chatMessage.message}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <TextField
        label="Message"
        variant="outlined"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
        onClick={handleSend}
      >
        Send
      </Button>
    </div>
  );
};

export default Home;
