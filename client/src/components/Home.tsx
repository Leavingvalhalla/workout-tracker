import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Stack, Box } from '@mui/material';
import { MyConsumer } from './MyContext';

function Home() {
  return (
    <MyConsumer>
      {(context: any) => (
        <div className="app">
          {context.user && (
            <Box>
              <Stack direction="row">
                {context.user.routine_id && (
                  <Button
                    size="large"
                    sx={{ margin: '3%' }}
                    variant="contained"
                  >
                    <Link
                      style={{ textDecoration: 'none', color: 'white' }}
                      to="/continue"
                    >
                      Continue Routine
                    </Link>
                  </Button>
                )}
                <Button size="large" sx={{ margin: '3%' }} variant="contained">
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to="/workout"
                  >
                    Custom Workout
                  </Link>
                </Button>
              </Stack>
              <Button
                sx={{ margin: '1% 1% 1% 5%' }}
                onClick={() => context.getLifts()}
                variant="outlined"
              >
                <Link
                  style={{ textDecoration: 'none', color: '#aa2c2d' }}
                  to="/all_workouts"
                >
                  Edit workouts
                </Link>
              </Button>
              <Button sx={{ margin: '1%' }} variant="outlined">
                <Link
                  style={{ textDecoration: 'none', color: '#aa2c2d' }}
                  to="/workout_data"
                >
                  See the stats
                </Link>
              </Button>
              <Button sx={{ margin: '1%' }} variant="outlined">
                <Link
                  style={{ textDecoration: 'none', color: '#aa2c2d' }}
                  to="/routines"
                >
                  Pick new routine
                </Link>
              </Button>
              <Button sx={{ margin: '1%' }} variant="outlined">
                <Link
                  style={{ textDecoration: 'none', color: '#aa2c2d' }}
                  to="/maxes"
                >
                  Set Your Maxes
                </Link>
              </Button>
              <Button sx={{ margin: '1%' }} variant="outlined">
                <Link
                  style={{ textDecoration: 'none', color: '#aa2c2d' }}
                  to="/custom_routines"
                >
                  custom routines
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
