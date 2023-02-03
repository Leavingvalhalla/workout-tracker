import { Typography, Card, Button } from '@mui/material';
import { useState } from 'react';
import { MyConsumer } from './MyContext';

function RoutineCard({ routine, setSignedUp }) {
  const [seeSample, setSeeSample] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <MyConsumer>
      {(context) => (
        <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
          <Typography variant="h4">{routine.name}</Typography>
          <Typography variant="h6">{routine.summary}</Typography>
          <Button onClick={() => setSeeSample((seeSample) => !seeSample)}>
            {seeSample ? 'Hide' : 'see'} sample workout
          </Button>
          <Button
            onClick={() => {
              setSignedUp(true);
              context.setRoutine((routine) => routine.id);
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
