import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState('');

  function onLogin(user) {
    setUser(user);
  }

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleSignupSubmit(username, password, password_confirmation) {
    fetch('signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, password_confirmation }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <Home />
      <Login onLogin={onLogin} />
      <Signup handleSignupSubmit={handleSignupSubmit} />
    </div>
  );
}

export default App;
