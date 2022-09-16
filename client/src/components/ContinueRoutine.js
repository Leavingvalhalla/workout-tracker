import { Box, TextField, Button, Typography, Card, Stack } from '@mui/material';
import { useState } from 'react';
import { MyConsumer } from './MyContext';
import { Link } from 'react-router-dom';

function ContinueRoutine() {
  const [reps, setReps] = useState('');

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
            {context.todaysLifts.map((lift, index) => (
              <Card
                variant="outlined"
                sx={{ margin: '1%', width: 250, display: 'inline-block' }}
                key={`lift ${index}`}
              >
                <Stack direction="row">
                  <Typography sx={{ margin: '2% 1%' }} variant="h6">
                    {lift.name}
                  </Typography>
                  <Typography sx={{ margin: '2% 1%' }} variant="h6">
                    {Math.floor((lift.weight * lift.max) / 5) * 5} lbs
                  </Typography>
                </Stack>
                <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
                  <Button sx={{ fontSize: 25 }} onClick={() => decreaseReps()}>
                    -
                  </Button>
                  <TextField
                    value={reps}
                    label={lift.amrap ? `${lift.reps}+` : lift.reps}
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
              </Card>
            ))}
          </Box>
        </div>
      )}
    </MyConsumer>
  );
}

// Maybe still figure out a way to render things differently if they're different lift names. Would be good for this
// page and the regular workout page.

export default ContinueRoutine;
