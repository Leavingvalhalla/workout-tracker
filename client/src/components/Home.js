import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Login from './Login';

function Home({ user, onLogin, onLogout }) {
  return (
    <div>
      <h1>Workout Tracker</h1>
      <Login onLogin={onLogin} onLogout={onLogout} user={user} />
      {!user && (
        <p>
          Don't have an account? <Link to="/signup">Create one here.</Link>
        </p>
      )}

      {user && (
        <Button variant="contained">
          <Link to="/workout">New Workout</Link>
        </Button>
      )}
      {user && (
        <Button variant="contained">
          <Link to="/all_workouts">See previous workouts</Link>
        </Button>
      )}
    </div>
  );
}

export default Home;
