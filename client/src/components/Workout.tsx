import React from 'react';
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
import { useState } from 'react';
import { MyConsumer } from './MyContext';
import NewLiftForm from './NewLiftForm';
import userLift from '../types/userLift';

function Workout() {
  const [liftName, setLiftName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [liftFormVisible, setLiftFormVisible] = useState<boolean>(false);

  function onWorkoutChange(e:any, val:any){
  console.log(e, val)
  setLiftName(val)}

  function clearForm() {
    setLiftName('');
    setWeight('');
    setReps('');
  }

  function toggleLiftForm() {
    setLiftFormVisible((liftFormVisible) => !liftFormVisible);
  }

  function decreaseWeight() {
    setWeight((weight) => (weight === '' || parseInt(weight) === 0 ? '0' : (parseInt(weight) - 5).toString()));
  }

  function increaseWeight() {
    setWeight((weight) => (weight === '' ? '5' : (parseInt(weight) + 5).toString()));
  }

  function decreaseReps() {
    setReps((reps) => (reps === '' || parseInt(reps) === 0 ? '0' : (parseInt(reps) - 1).toString()));
  }

  function increaseReps() {
    setReps((reps) => (reps === '' ? '1' : (parseInt(reps) + 1).toString()));
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <div className="app">
          <Box>
            <Autocomplete
              sx={{ maxWidth: 275, margin: '1% 1% 1% 5%' }}
              getOptionLabel={(option: any) => option.name}
              options={context.lifts}
              inputValue={liftName}
              onInputChange={(e: any, val) => onWorkoutChange(e, val)}
              renderInput={(params) => <TextField label="lift" {...params} />}
            />
            {context.userLiftError === 'no lift selected' && (
              <p
                style={{
                  color: '#aa2c2d',
                  margin: '0 0 0 10%',
                  padding: 0,
                  border: 0,
                }}
              >
                <small>Lift can't be blank.</small>
              </p>
            )}
            <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
              <Button
                sx={{ fontSize: 25 }}
                size="large"
                onClick={() => decreaseWeight()}
              >
                -
              </Button>
              <TextField
                error={
                  context.userLiftError === 'no weight selected' ? true : false
                }
                sx={{ margin: '1%' }}
                value={weight}
                label="weight"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}
                helperText={
                  context.userLiftError === 'no weight selected' &&
                  "Weight can't be blank."
                }
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
                error={
                  context.userLiftError === 'no reps selected' ? true : false
                }
                value={reps}
                label="reps"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReps(e.target.value)}
                helperText={
                  context.userLiftError === 'no reps selected' &&
                  "Reps can't be blank."
                }
              />
              <Button
                sx={{ fontSize: 25 }}
                size="large"
                onClick={() => increaseReps()}
              >
                +
              </Button>
            </Stack>
            <Stack sx={{ margin: '1%' }} spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={() => context.onLogSet(liftName, weight, reps)}
              >
                Save
              </Button>
              <Button variant="contained" onClick={() => clearForm()}>
                Clear
              </Button>
            </Stack>
          </Box>
          <Button sx={{ margin: '1%' }} onClick={() => toggleLiftForm()}>
            Add new lift type
          </Button>
          {liftFormVisible && <NewLiftForm />}
          <div className="row">
            {context.currentWorkout.map((set: userLift, index: string) => (
              <Card
                variant="outlined"
                key={`set ${index}`}
                sx={{ maxWidth: 200, margin: '1%' }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {set.lift_name}
                  </Typography>
                  <Typography variant="h6">
                    {set.weight} lbs x {set.reps}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </MyConsumer>
  );
}

export default Workout;
