import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { MyConsumer } from './MyContext';
import { Link } from 'react-router-dom';
import NewLiftForm from './NewLiftForm';

function Workout() {
  const [liftName, setLiftName] = useState('');
  // const [liftId, setLiftId] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [changed, setChanged] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutId, setWorkoutId] = useState([]);
  const [liftFormVisible, setLiftFormVisible] = useState(false);

  // useEffect(() => {
  //   if (changed) {
  //     fetch(`/lifts/${liftName}`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setLiftId(data.id));
  //   }
  // }, [liftName, changed]);

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
    const today = getToday();

    fetch('/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, date: today }),
    })
      .then((res) => res.json())
      .then((data) => setWorkoutId(data.id))
      .then(
        fetch('/user_lifts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workout_id: workoutId,
            lift_name: liftName,
            weight,
            reps,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setCurrentWorkout([...currentWorkout, data]);
          })
      );
  }

  function toggleLiftForm() {
    setLiftFormVisible((liftFormVisible) => !liftFormVisible);
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
              getOptionLabel={(option) => option.name}
              options={context.lifts}
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
