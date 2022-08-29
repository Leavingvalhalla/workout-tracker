import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Login from './Login';
import { MyConsumer } from './MyContext';

function Home() {
  return (
    <MyConsumer>
      {(context) => (
        <div>
          <h1>Workout Tracker</h1>
          <Login />
          {!context.user && (
            <p>
              Don't have an account? <Link to="/signup">Create one here.</Link>
            </p>
          )}

          {context.user && (
            <>
              <Button variant="contained">
                <Link to="/workout">New Workout</Link>
              </Button>
              <Button variant="contained">
                <Link to="/all_workouts">See previous workouts</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </MyConsumer>
  );
}

export default Home;
