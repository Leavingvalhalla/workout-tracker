import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewLiftForm from './NewLiftForm';

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
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ];
    const today =
      month.toString() + '/' + day.toString() + '/' + year.toString();

    fetch('/newset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        lift_name: liftName,
        weight,
        reps,
        date: today,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentWorkout([...currentWorkout, data]);
      });
  }
  // TODO: Add conditional rendering for NewLiftForm. Also actually make the form.
  return (
    <>
      <Link to="/">Back to Home</Link>
      <Typography variant="h3">Current Workout</Typography>
      {currentWorkout.map((set, index) => (
        <Typography
          key={`set ${index}`}
          variant="h4"
        >{`Lift: ${set.lift_name} Weight: ${set.weight}  Reps: ${set.reps}`}</Typography>
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
