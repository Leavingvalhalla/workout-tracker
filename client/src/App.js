import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState('');

  function onLogin(currentUser) {
    setUser(currentUser);
  }

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((currentUser) => setUser(currentUser));
      }
    });
  }, []);

  function onLogout() {
    fetch('/logout', {
      method: 'DELETE',
    });
    setUser('');
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={onLogin} onLogout={onLogout} user={user} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
