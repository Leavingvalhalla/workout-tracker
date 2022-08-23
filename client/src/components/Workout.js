import { Box, TextField, Autocomplete, Button } from '@mui/material';
import { useState, useEffect } from 'react';

function Workout({ user, lifts }) {
  const [liftName, setLiftName] = useState('');
  const [liftId, setLiftId] = useState('');
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [changed, setChanged] = useState(false);

  const defaultProps = {
    options: lifts,
    getOptionLabel: (option) => option.name,
  };

  useEffect(() => {
    if (changed) {
      fetch(`/lifts/${liftName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => setLiftId(data.id));
    }
  }, [liftName]);

  function onLogSet() {
    fetch('/newset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, lift_id: liftId, weight, reps }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <Box>
        <Autocomplete
          {...defaultProps}
          inputValue={liftName}
          onInputChange={(e, val) => {
            setChanged(true);
            setLiftName(val);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          value={weight}
          label="weight"
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          value={reps}
          label="reps"
          onChange={(e) => setReps(e.target.value)}
        />
        <Button variant="contained" onClick={onLogSet}>
          Log set
        </Button>
      </Box>
    </>
  );
}

export default Workout;
