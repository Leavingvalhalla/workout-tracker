import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import { MyConsumer } from './MyContext';

function Login() {
  // prettier-ignore
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  return (
    <MyConsumer>
      {(context) => (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => context.onLogin(e, username, password)}
        >
          {!context.user ? (
            <>
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
            </>
          ) : (
            <Button variant="contained" onClick={() => context.onLogout()}>
              Log Out
            </Button>
          )}
          {context.loginFailed && (
            <p>Sorry, that didn't work. Are you sure you have an account?</p>
          )}
        </Box>
      )}
    </MyConsumer>
  );
}

export default Login;
