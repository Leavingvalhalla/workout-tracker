import { Link } from 'react-router-dom';
import Login from './Login';
import Workout from './Workout';

function Home({ user }) {
  return (
    <div>
      <h1>Workout Tracker</h1>
      <Login />
      <p>
        Don't have an account? <Link to="/signup">Create one here.</Link>
      </p>

      {user && <Workout user={user} />}
      {console.log(user)}
    </div>
  );
}

export default Home;
