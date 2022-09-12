import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import { MyConsumer } from './MyContext';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

function AllWorkouts() {
  const [newLift, setNewLift] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newReps, setNewReps] = useState('');
  const [liftId, setLiftId] = useState('');
  const [userLiftId, setUserLiftId] = useState('');
  const [workoutId, setWorkoutId] = useState('');
  const [date, setDate] = useState(dayjs('2022-08-01'));
  const [liftsByDate, setLiftsByDate] = useState([]);

  function fillForm(workout) {
    console.log(workout);
    setNewLift(workout.name);
    setNewWeight(workout.weight);
    setNewReps(workout.reps);
    setLiftId(workout.lift_id);
    setWorkoutId(workout.workout_id);
    setUserLiftId(workout.id);
  }

  function handleDateChange(newDate) {
    setDate(newDate);
    let parsedDate =
      newDate.$y.toString() +
      '-' +
      (newDate.$M + 1).toString() +
      '-' +
      newDate.$D.toString();
    fetch(`/workouts/byDate/${parsedDate}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setLiftsByDate(data);
      });
  }

  function onUpdateUserLift(id, lift_id, workout_id, weight, reps) {
    fetch(`/user_lifts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lift_id,
        workout_id,
        weight,
        reps,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLiftsByDate((liftsByDate) =>
          liftsByDate.map((lift) =>
            lift.id === id
              ? {
                  name: data.name,
                  id: data.id,
                  lift_id: data.lift_id,
                  workout_id: data.workout_id,
                  weight: data.weight,
                  reps: data.reps,
                }
              : lift
          )
        );
      });
  }

  function onDeleteUserLift(id) {
    fetch(`/user_lifts/${id}`, { method: 'DELETE' });

    console.log(id);
    console.log(liftsByDate);
    setLiftsByDate(liftsByDate.filter((lift) => lift.id !== id));
  }

  // TODO: Change selected lift card to contained

  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <Stack sx={{ margin: '1%' }} spacing={3}>
            <Button
              sx={{ maxWidth: 150 }}
              className="button"
              variant="contained"
            >
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
                to="/"
              >
                Back to home
              </Link>
            </Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={date}
                label="Workout Date"
                inputFormat="MM/DD/YYYY"
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField sx={{ width: 150 }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Stack>
          <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
            <TextField
              value={newLift}
              label="Lift"
              name="Lift"
              onChange={(e) => setNewLift(e.target.value)}
            />
            <TextField
              value={newWeight}
              label="Weight"
              name="Weight"
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <TextField
              value={newReps}
              label="Reps"
              name="Reps"
              onChange={(e) => setNewReps(e.target.value)}
            />
            <Button
              className="button"
              onClick={() =>
                onUpdateUserLift(
                  userLiftId,
                  liftId,
                  workoutId,
                  newWeight,
                  newReps
                )
              }
            >
              Update
            </Button>
            <Button
              className="button"
              onClick={() => onDeleteUserLift(userLiftId)}
            >
              Delete
            </Button>
          </Stack>
          {liftsByDate.map((lift, index) => (
            <Card
              onClick={() => fillForm(lift)}
              key={`lift ${index}`}
              variant="outlined"
              sx={{ width: 175, margin: '1%', display: 'inline-flex' }}
            >
              <CardContent>
                <Typography>{lift.name}</Typography>
                <Typography>{lift.weight} lbs</Typography>
                <Typography>{lift.reps} reps</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MyConsumer>
  );
}

export default AllWorkouts;
