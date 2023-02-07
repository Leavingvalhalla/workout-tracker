import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import userLift from '../types/userLift';


function AllWorkouts() {
  const [newLift, setNewLift] = useState<string>('');
  const [newWeight, setNewWeight] = useState<string>('');
  const [newReps, setNewReps] = useState<string>('');
  const [liftId, setLiftId] = useState<string>('');
  const [userLiftId, setUserLiftId] = useState<string>('');
  const [workoutId, setWorkoutId] = useState<string>('');
  const [date, setDate] = useState(dayjs('2022-10-01'));
  const [liftsByDate, setLiftsByDate] = useState<userLift[]>([]);
  const [selected, setSelected] = useState<string>('');

  function fillForm(workout: {lift_name: string, weight: string, reps: string, lift_id: string, workout_id: string, id: string}) {
    setNewLift(workout.lift_name);
    setNewWeight(workout.weight);
    setNewReps(workout.reps);
    setLiftId(workout.lift_id);
    setWorkoutId(workout.workout_id);
    setUserLiftId(workout.id);
  }

  function handleDateChange(newDate: any) {
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
  
  function onUpdateUserLift(id: string, lift_id: string, workout_id: string, weight: string, reps: string) {
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
        setLiftsByDate((liftsByDate: userLift[]) =>
          liftsByDate.map((lift: userLift) =>
            lift.id === id
              ? {
                  lift_name: data.name,
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

  function onDeleteUserLift(id: string) {
    fetch(`/user_lifts/${id}`, { method: 'DELETE' });
    setLiftsByDate(liftsByDate.filter((lift) => lift.id !== id));
  }

  return (
        <div className="app">
          <Stack sx={{ margin: '1%' }} spacing={3}>
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
          {selected && liftsByDate.length === 0 && (
            <Typography>
              It looks like you don't have a workout from that date.
            </Typography>
          )}
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
              onClick={() => {
                setNewLift('');
                setNewWeight('');
                setNewReps('');
                onUpdateUserLift(
                  userLiftId,
                  liftId,
                  workoutId,
                  newWeight,
                  newReps
                );
              }}
            >
              Update
            </Button>
            <Button
              className="button"
              onClick={() => {
                setNewLift('');
                setNewWeight('');
                setNewReps('');
                onDeleteUserLift(userLiftId);
              }}
            >
              Delete
            </Button>
          </Stack>
          {liftsByDate.length > 1 &&
            liftsByDate.map((lift: userLift, index) => (
              <Card
                onClick={() => {
                  setSelected(lift.id);
                  fillForm(lift);
                }}
                key={`lift ${index}`}
                variant="outlined"
                sx={{ width: 175, margin: '1%', display: 'inline-flex' }}
              >
                <CardContent>
                  <Typography
                    sx={{ color: selected === lift.id ? '#aa2c2d' : 'black' }}
                  >
                    {lift.lift_name}
                  </Typography>
                  <Typography
                    sx={{ color: selected === lift.id ? '#aa2c2d' : 'black' }}
                  >
                    {lift.weight} lbs
                  </Typography>
                  <Typography
                    sx={{ color: selected === lift.id ? '#aa2c2d' : 'black' }}
                  >
                    {lift.reps} reps
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

export default AllWorkouts;
