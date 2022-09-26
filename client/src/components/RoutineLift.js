import { TextField, Button, Typography, Card, Stack } from '@mui/material';
import { useState } from 'react';

function RoutineLift({ lift, index, context }) {
  const [reps, setReps] = useState('');

  function decreaseReps() {
    setReps((reps) => (reps === '' || reps === 0 ? 0 : reps - 1));
  }

  function increaseReps() {
    setReps((reps) => (reps === '' ? 1 : parseInt(reps) + 1));
  }

  // TODO: Add conditional rendering of a "Saved!" after saved so you don't have to hit one again. \
  // Change the color of the card? Remove it?

  return (
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
          onClick={() =>
            context.onLogSet(
              lift.name,
              Math.floor((lift.weight * lift.max) / 5) * 5,
              reps
            )
          }
        >
          Save
        </Button>
      </Stack>
    </Card>
  );
}

export default RoutineLift;
