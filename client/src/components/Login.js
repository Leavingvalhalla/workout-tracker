import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

function Login({ onLogin }) {
  // prettier-ignore
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  function handleSubmit() {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => onLogin(user));
      }
    });
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
}

export default Login;
