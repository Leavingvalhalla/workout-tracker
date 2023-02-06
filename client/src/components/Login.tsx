import React from 'react'
import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyConsumer } from './MyContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  function routeChange() {
    let path = '/';
    navigate(path);
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <Box
          className="app"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            routeChange();
            context.onLogin(e, username, password);
          }}
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
              <Button type="submit">Log In</Button>
            </>
          ) : (
            <Button
              onClick={() => {
                routeChange();
                context.onLogout();
              }}
            >
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
