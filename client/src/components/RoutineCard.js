import { useState } from 'react';

function RoutineCard({ routine }) {
  const [seeSample, setSeeSample] = useState(false);
  return (
    <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
      <Typography variant="h4">{routine.name}</Typography>
      <Typography variant="h6">{routine.summary}</Typography>
      <Button onClick={() => setSeeSample((seeSample) => !seeSample)}>
        {seeSample ? 'Hide' : 'see'} sample workout
      </Button>
      <Button
        onClick={() => {
          setSignedUp(true);
          context.setRoutine((routine) => {
            routine.id;
          });
        }}
        variant="contained"
      >
        Start Routine
      </Button>
      {selected && <p>{routine.sample}</p>}
    </Card>
  );
}

export default RoutineCard;
