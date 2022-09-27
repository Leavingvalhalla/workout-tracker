import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [signedUp, setSignedup] = useState(false);
  const [failed, setFailed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSignedup(false);
    setFailed(false);
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data['errors']) {
          setFailed(true);
        } else {
          setSignedup(true);
        }
      });
  }

  return (
    <div className="app">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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
        <TextField
          label="confirm password"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button className="button" variant="contained" type="submit">
          Sign me up!
        </Button>
      </Box>
      {signedUp && (
        <div>
          <p>You did it! Now you can login.</p>
        </div>
      )}
      {failed && (
        <div>
          <p>Sorry, I think you made a typo. Please try again.</p>
        </div>
      )}
    </div>
  );
}

export default Signup;
