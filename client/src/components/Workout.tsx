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

function Workout() {
  const [liftName, setLiftName] = useState<string>('');
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [reps, setReps] = useState<number | undefined>(undefined);
  const [liftFormVisible, setLiftFormVisible] = useState<boolean>(false);

  function clearForm() {
    setLiftName('');
    setWeight(undefined);
    setReps(undefined);
  }

  function toggleLiftForm() {
    setLiftFormVisible((liftFormVisible) => !liftFormVisible);
  }

  function decreaseWeight() {
    setWeight((weight) => (weight === undefined || weight === 0 ? 0 : weight - 5));
  }

  function increaseWeight() {
    setWeight((weight) => (weight === undefined ? 5 : weight + 5));
  }

  function decreaseReps() {
    setReps((reps) => (reps === undefined || reps === 0 ? 0 : reps - 1));
  }

  function increaseReps() {
    setReps((reps) => (reps === undefined ? 1 : reps + 1));
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <div className="app">
          <Box>
            <Autocomplete
              sx={{ maxWidth: 275, margin: '1% 1% 1% 5%' }}
              getOptionLabel={(option: {id: number, name: string}) => option.name}
              options={context.lifts}
              inputValue={liftName}
              // onInputChange={(e: React.ChangeEvent<HTMLInputElement>, val) => setLiftName(val)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(parseInt(e.target.value))}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReps(parseInt(e.currentTarget.value))}
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
          {liftFormVisible && <NewLiftForm toggleLiftForm={toggleLiftForm} />}
          <div className="row">
            {context.currentWorkout.map((set: {lift_name: string, weight: number, reps: number},
             index: number) => (
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
