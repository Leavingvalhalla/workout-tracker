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
  const [liftName, setLiftName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [liftFormVisible, setLiftFormVisible] = useState(false);

  function clearForm() {
    setLiftName('');
    setWeight('');
    setReps('');
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
            {context.currentWorkout.map((set, index) => (
              <Card
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
        </div>
      )}
    </MyConsumer>
  );
}

export default Workout;
