import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { MyConsumer } from './MyContext';
import { Link } from 'react-router-dom';
import NewLiftForm from './NewLiftForm';

function Workout() {
  const [liftName, setLiftName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  // const [liftId, setLiftId] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutId, setWorkoutId] = useState('');
  const [liftFormVisible, setLiftFormVisible] = useState(false);
  // const [update, setUpdate] = useState(false);
  const [quoteInfo, setQuoteInfo] = useState('');

  useEffect(() => {
    fetch('/quote', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setQuoteInfo(data));
  }, []);

  // get todays date as a string to save to a Workout
  function getToday() {
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ];
    return (
      year.toString() + '-' + (month + 1).toString() + '-' + day.toString()
    );
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

  function clearForm() {
    setLiftName('');
    setWeight('');
    setReps('');
  }

  // function onSetClick(set) {
  //   setUpdate(true);
  //   setLiftName(set.liftname);
  //   setWeight(set.weight);
  //   setReps(set.reps);
  //   setLiftId(set.id);
  // }

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
    setWeight((weight) => (weight === '' || weight === 0 ? 0 : weight - 5));
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
        <div className="app">
          <Button sx={{ margin: '1%' }} variant="contained">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              Back to Home
            </Link>
          </Button>
          <Typography sx={{ margin: '2% 1%' }} variant="h3">
            Current Workout
          </Typography>
          <Box>
            <Autocomplete
              sx={{ maxWidth: 275, margin: '1% 1% 1% 5%' }}
              getOptionLabel={(option) => option.name}
              options={context.lifts}
              inputValue={liftName}
              label="lift"
              onInputChange={(e, val) => setLiftName(val)}
              renderInput={(params) => <TextField label="lift" {...params} />}
            />
            <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
              <Button
                sx={{ fontSize: 25 }}
                size="large"
                onClick={() => decreaseWeight()}
              >
                -
              </Button>
              <TextField
                sx={{ margin: '1%' }}
                value={weight}
                label="weight"
                onChange={(e) => setWeight(e.target.value)}
              />
              <Button
                sx={{ fontSize: 25 }}
                size="large"
                className="button"
                onClick={() => increaseWeight()}
              >
                +
              </Button>
            </Stack>
            <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
              <Button sx={{ fontSize: 25 }} onClick={() => decreaseReps()}>
                -
              </Button>
              <TextField
                value={reps}
                label="reps"
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
            {/* {update ? (
              <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={() => onLogSet(context.user)}
                >
                  update
                </Button>
                <Button variant="contained" onClick={() => clearForm()}>
                  delete
                </Button>
              </Stack>
            ) : ( */}
            <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={() => onLogSet(context.user)}
              >
                Save
              </Button>
              <Button variant="contained" onClick={() => clearForm()}>
                Clear
              </Button>
            </Stack>
            {/* )} */}
          </Box>
          <Button sx={{ margin: '1%' }} onClick={() => toggleLiftForm()}>
            Add new lift
          </Button>
          {liftFormVisible && <NewLiftForm toggleLiftForm={toggleLiftForm} />}
          {quoteInfo !== '' && (
            <Typography>
              "{quoteInfo.quote}"<br /> -{quoteInfo.author}
            </Typography>
          )}

          {currentWorkout.map((set, index) => (
            <Card
              // onClick={() => onSetClick(set)}
              variant="outlined"
              key={`set ${index}`}
              sx={{ maxWidth: 200, margin: '1%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {set.lift_name}
                </Typography>
                <Typography variant="7">
                  {set.weight} lbs x {set.reps}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MyConsumer>
  );
}

export default Workout;
