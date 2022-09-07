import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import Login from './Login';
import { MyConsumer } from './MyContext';

function Home() {
  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <img src="swole.png" alt="Swole" />
          <Login />
          {!context.user && (
            <p>
              Don't have an account? <Link to="/signup">Create one here.</Link>
            </p>
          )}

          {context.user && (
            <Box>
              <Button
                sx={{ margin: '1%' }}
                onClick={() => context.getQuote()}
                variant="contained"
              >
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to="/workout"
                >
                  New Workout
                </Link>
              </Button>
              <Button
                sx={{ margin: '1%' }}
                onClick={() => context.getLifts()}
                variant="contained"
              >
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to="/all_workouts"
                >
                  Edit workouts
                </Link>
              </Button>
              <Button sx={{ margin: '1%' }} variant="contained">
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to="/workout_data"
                >
                  Workout data
                </Link>
              </Button>
              <Button sx={{ margin: '1%' }} variant="contained">
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to="/date_picker"
                >
                  Date picker
                </Link>
              </Button>
            </Box>
          )}
        </div>
      )}
    </MyConsumer>
  );
}

export default Home;
