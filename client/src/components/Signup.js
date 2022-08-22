import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

function Signup({ handleSignupSubmit }) {
  // prettier-ignore
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleSignupSubmit(username, password, passwordConfirmation);
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-required"
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
      <TextField
        label="confirm password"
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

export default Signup;
