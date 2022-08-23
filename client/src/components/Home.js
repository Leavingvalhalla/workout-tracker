import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Home() {
  return (
    <div>
      <h1>Workout Tracker</h1>
      <Button>Log In</Button>
      <p>
        Don't have an account? <Link to="/signup">Create one here.</Link>
      </p>
    </div>
  );
}

export default Home;
