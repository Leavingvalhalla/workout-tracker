import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Workout({ user, lifts }) {
  const [liftName, setLiftName] = useState('');
  const [liftId, setLiftId] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [changed, setChanged] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState([]);

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
  }, [liftName, changed]);

  //   TODO: add validators to make sure you need a liftID to post a lift

  // if new set is created on same date as a workout already in the database,
  // update the workout. If not, create a new workout.

  function onLogSet() {
    fetch('/newset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, lift_id: liftId, weight, reps }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentWorkout([...currentWorkout, data]);
        fetch('/add_workout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_lift_id: data.id,
            date: data.created_at,
          }),
        });
      });
  }

  return (
    <>
      <Link to="/">Back to Home</Link>
      <Typography variant="h3">Current Workout</Typography>
      {currentWorkout.map((set, index) => (
        <Typography
          id={`set ${index}`}
          variant="h4"
        >{`Weight: ${set.weight}  Reps: ${set.reps}`}</Typography>
      ))}
      <Box>
        <Autocomplete
          {...defaultProps}
          inputValue={liftName}
          label="lift"
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
