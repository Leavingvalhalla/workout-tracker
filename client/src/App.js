import './App.css';
import Login from './components/Login';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState('');

  function handleFormSubmit(user, password, password_confirmation) {
    setUser(user);
  }

  return (
    <div>
      <Login handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
