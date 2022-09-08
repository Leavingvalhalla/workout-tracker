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
  const [expand, setExpand] = useState(false);
  const [newLift, setNewLift] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newReps, setNewReps] = useState('');
  const [liftId, setLiftId] = useState('');
  const [userLiftId, setUserLiftId] = useState('');
  const [workoutId, setWorkoutId] = useState('');
  const [date, setDate] = useState(dayjs('2022-08-01T17:00:00'));

  function fillForm(workout) {
    console.log(workout);
    setNewLift(workout.name);
    setNewWeight(workout.weight);
    setNewReps(workout.reps);
    setLiftId(workout.lift_id);
    setWorkoutId(workout.workout_id);
    setUserLiftId(workout.user_lift_id);
  }

  function handleDateChange(newDate) {
    setDate(newDate);
    let parsedDate = date.$y + '/' + (date.$M + 1) + '/' + date.$H;
    fetch(`/workouts/byDate/${parsedDate}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
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
                label="Workout Date"
                inputFormat="MM/DD/YYYY"
                value={date}
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
                context.onUpdateUserLift(
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
              onClick={() => context.onDeleteUserLift(userLiftId)}
            >
              Delete
            </Button>
          </Stack>
          {expand &&
            context.workoutData.map((workout, index) => (
              <Card
                onClick={() => fillForm(workout)}
                key={`workout ${index}`}
                variant="outlined"
                sx={{ maxWidth: 175 }}
              >
                <CardContent>
                  <Typography>{workout.name}</Typography>
                  <Typography>{workout.weight} lbs</Typography>
                  <Typography>{workout.reps} reps</Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </MyConsumer>
  );
}

export default AllWorkouts;
