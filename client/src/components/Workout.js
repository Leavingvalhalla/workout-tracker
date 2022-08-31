import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MyConsumer } from './MyContext';
import { Link } from 'react-router-dom';
import NewLiftForm from './NewLiftForm';

function Workout() {
  const [liftName, setLiftName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutId, setWorkoutId] = useState('');
  const [liftFormVisible, setLiftFormVisible] = useState(false);

  // get todays date as a string to save to a Workout
  function getToday() {
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ];
    return year.toString() + '/' + month.toString() + '/' + day.toString();
  }

  // creates new Workout, then new user_lift with current workout_id
  function onLogSet(user) {
    if (!workoutId) {
      const today = getToday();

      fetch('/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, date: today }),
      })
        .then((res) => res.json())
        .then((data) => {
          setWorkoutId(data.id);
          post_lift(data.id);
        });
    } else {
      post_lift(workoutId);
    }
  }

  function post_lift(id) {
    fetch('/user_lifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workout_id: id,
        lift_name: liftName,
        weight,
        reps,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentWorkout([...currentWorkout, data]);
      });
  }

  function toggleLiftForm() {
    setLiftFormVisible((liftFormVisible) => !liftFormVisible);
  }

  function decreaseWeight() {
    setWeight((weight) => (weight === '' || weight === 0 ? 0 : weight - 1));
  }

  function increaseWeight() {
    setWeight((weight) => (weight === '' ? 5 : parseInt(weight) + 5));
  }

  function decreaseReps() {
    setReps((reps) => (reps === '' || reps === 0 ? 0 : reps - 1));
  }

  function increaseReps() {
    setReps((reps) => (reps === '' ? 1 : parseInt(reps) + 1));
  }

  return (
    <MyConsumer>
      {(context) => (
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
              sx={{ maxWidth: 275 }}
              getOptionLabel={(option) => option.name}
              options={context.lifts}
              inputValue={liftName}
              label="lift"
              onInputChange={(e, val) => setLiftName(val)}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button onClick={() => decreaseWeight()}>-</Button>
            <TextField
              value={weight}
              label="weight"
              onChange={(e) => setWeight(e.target.value)}
            />
            <Button onClick={() => increaseWeight()}>+</Button>
            <Button onClick={() => decreaseReps()}>-</Button>
            <TextField
              value={reps}
              label="reps"
              onChange={(e) => setReps(e.target.value)}
            />
            <Button onClick={() => increaseReps()}>+</Button>
            <Button variant="contained" onClick={() => onLogSet(context.user)}>
              Log set
            </Button>
          </Box>
          <Button onClick={() => toggleLiftForm()}>Add new lift</Button>
          {liftFormVisible && <NewLiftForm toggleLiftForm={toggleLiftForm} />}
        </>
      )}
    </MyConsumer>
  );
}

export default Workout;
