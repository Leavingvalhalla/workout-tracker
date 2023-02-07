import { TextField, Button, Typography, Card, Stack } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import userRoutineLift from '../types/userRoutineLift';

interface routineLiftProps {
  lift: userRoutineLift, index: number, context: any
}

function RoutineLift({ lift, index, context }: routineLiftProps) {
  const [reps, setReps] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  function decreaseReps() {
    setReps((reps) => (reps === '' || parseInt(reps) === 0 ? '0' : (parseInt(reps) - 1).toString()));
  }

  function increaseReps() {
    setReps((reps) => (reps === '' ? '1' : (parseInt(reps) + 1).toString()));
  }

  return (
    <Card
      variant="outlined"
      sx={{
        margin: '1%',
        width: 250,
        display: 'inline-block',
        opacity: saved ? 0.5 : 1,
      }}
      key={`lift ${index}`}
    >
      <Stack direction="row">
        <Typography sx={{ margin: '2% 1%' }} variant="h6">
          {lift.name}
        </Typography>
        <Typography sx={{ margin: '2% 1%' }} variant="h6">
          {Math.floor((parseInt(lift.weight) * parseInt(lift.lift_max)) / 5) * 5} lbs
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
          onClick={() => {
            setSaved(true);
            context.onLogSet(
              lift.name,
              Math.floor((parseInt(lift.weight) * parseInt(lift.lift_max)) / 5) * 5,
              reps
            );
          }}
        >
          Save
        </Button>
      </Stack>
    </Card>
  );
}

export default RoutineLift;
