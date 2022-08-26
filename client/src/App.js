import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Workout from './components/Workout';
import AllWorkouts from './components/AllWorkouts';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState('');
  const [lifts, setLifts] = useState([]);

  function onLogin(currentUser) {
    setUser(currentUser);
  }

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((currentUser) => setUser(currentUser));
      }
    });
    fetch('/lifts/all')
      .then((res) => res.json())
      .then((data) => setLifts(data));
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
          index
          path="/"
          element={
            <Home
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
              lifts={lifts}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/workout"
          element={<Workout user={user} lifts={lifts} />}
        />
        <Route path="/all_workouts" element={<AllWorkouts user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
