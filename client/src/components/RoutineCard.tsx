import React from 'react'
import { Typography, Card, Button } from '@mui/material';
import { useState } from 'react';
import { MyConsumer } from './MyContext';
import routine from '../types/routine';

interface routineCardProps {
  routine: routine, setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;

}

function RoutineCard({ routine, setSignedUp }: routineCardProps) {
  const [seeSample, setSeeSample] = useState<boolean>(false);

  return (
    <MyConsumer>
      {(context: any) => (
        <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
          <Typography variant="h4">{routine.name}</Typography>
          <Typography variant="h6">{routine.summary}</Typography>
          <Button onClick={() => setSeeSample((seeSample) => !seeSample)}>
            {seeSample ? 'Hide' : 'see'} sample workout
          </Button>
          <Button
            onClick={() => {
              setSignedUp(true);
              context.setRoutine((routine: routine) => routine.id);
            }}
            variant="contained"
          >
            Start Routine
          </Button>
          {seeSample && <p>{routine.sample}</p>}
        </Card>
      )}
    </MyConsumer>
  );
}
export default RoutineCard;
