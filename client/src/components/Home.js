import { Link } from 'react-router-dom';

import Login from './Login';
import Workout from './Workout';

function Home({ user, onLogin, onLogout, lifts }) {
  return (
    <div>
      <h1>Workout Tracker</h1>
      <Login onLogin={onLogin} onLogout={onLogout} user={user} />
      {!user && (
        <p>
          Don't have an account? <Link to="/signup">Create one here.</Link>
        </p>
      )}
      {user && <Workout user={user} lifts={lifts} />}
    </div>
  );
}

export default Home;
