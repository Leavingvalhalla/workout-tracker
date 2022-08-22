import './App.css';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';

function App() {
  function handleSignupSubmit(username, password, password_confirmation) {
    console.log(password);
    fetch('users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, password_confirmation }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <Signup handleSignupSubmit={handleSignupSubmit} />
    </div>
  );
}

export default App;
