import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

function Login({ handleFormSubmit }) {
  // prettier-ignore
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit() {
    handleFormSubmit(username, password, passwordConfirmation);
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        required
        id="outlined-required"
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        label="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        required
        label="confirm"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
}

export default Login;
