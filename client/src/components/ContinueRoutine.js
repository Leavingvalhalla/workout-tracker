import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { MyConsumer } from './MyContext';
import { Link } from 'react-router-dom';

function ContinueRoutine() {
  const [reps, setReps] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);

  function decreaseReps() {
    setReps((reps) => (reps === '' || reps === 0 ? 0 : reps - 1));
  }

  function increaseReps() {
    setReps((reps) => (reps === '' ? 1 : parseInt(reps) + 1));
  }

  function onLogSet() {
    return;
  }

  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <Button sx={{ margin: '1%' }} variant="contained">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              Back to Home
            </Link>
          </Button>
          <Box>
            {context.todaysLifts.map((lift, index) => {
              <div key={`lift ${index}`}>
                <Typography sx={{ margin: '2% 1%' }} variant="h3">
                  {lift.name}
                </Typography>
                <Typography sx={{ margin: '2% 1%' }} variant="h3">
                  {lift.weight}
                </Typography>
                <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
                  <Button sx={{ fontSize: 25 }} onClick={() => decreaseReps()}>
                    -
                  </Button>
                  <TextField
                    value={reps}
                    label="reps"
                    onChange={(e) => setReps(e.target.value)}
                  />
                  <Button
                    sx={{ fontSize: 25 }}
                    size="large"
                    onClick={() => increaseReps()}
                  >
                    +
                  </Button>
                </Stack>
                <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={() => onLogSet(context.user)}
                  >
                    Save
                  </Button>
                </Stack>
              </div>;
            })}
          </Box>

          {currentWorkout.map((set, index) => (
            <Card
              // onClick={() => onSetClick(set)}
              variant="outlined"
              key={`set ${index}`}
              sx={{ maxWidth: 200, margin: '1%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {set.lift_name}
                </Typography>
                <Typography variant="7">
                  {set.weight} lbs x {set.reps}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MyConsumer>
  );
}

export default ContinueRoutine;
