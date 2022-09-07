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
              <Button onClick={() => context.getQuote()} variant="contained">
                <Link to="/workout">New Workout</Link>
              </Button>
              <Button onClick={() => context.getLifts()} variant="contained">
                <Link to="/all_workouts">Edit workouts</Link>
              </Button>
              <Button>
                <Link to="/workout_data">Workout data</Link>
              </Button>
              <Button>
                <Link to="/date_picker">Date picker</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </MyConsumer>
  );
}

export default Home;
