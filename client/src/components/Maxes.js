import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Stack,
  Typography,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { MyConsumer } from './MyContext';
import { Link } from 'react-router-dom';

function Maxes() {
  const [liftName, setLiftName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [max, setMax] = useState('');
  const [startingWeight, setStartingWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [maxCalculated, setMaxCalculated] = useState(false);
  const [expandInstructions, setExpandInstructions] = useState(false);

  function calculateMax() {
    let oneRepMax;
    if (reps === 1) {
      oneRepMax = weight;
    } else {
      oneRepMax = Math.floor(weight * reps * 0.0333 + weight);
    }
    setMax(oneRepMax);
    setMaxCalculated(true);
  }

  function onSaveStartingWeight(user) {
    let info = { user_id: user.id, lift: liftName, max: startingWeight };

    if (goalWeight) {
      info.goal = goalWeight;
    }

    fetch('/maxes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
  }

  return (
    <MyConsumer>
      {(context) => (
        <div>
          <Button sx={{ margin: '1%' }} variant="contained">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              Back to Home
            </Link>
          </Button>
          <Box sx={{ margin: '1%' }}>
            <Autocomplete
              sx={{ maxWidth: 275, margin: '1% 1% 1% 5%' }}
              getOptionLabel={(option) => option.name}
              options={context.lifts}
              inputValue={liftName}
              label="Lift"
              onInputChange={(e, val) => setLiftName(val)}
              renderInput={(params) => <TextField label="Lift" {...params} />}
            />
            <Button onClick={() => setExpandInstructions(true)}>
              Don't know your starting weights?
            </Button>
            {expandInstructions && (
              <Card variant="outlined" sx={{ width: '50%' }}>
                <Typography>
                  If you don't know what weights to start with for your program,
                  start with an empty barbell and perform the number of reps
                  required for your first set. If this is completed easily, and
                  with good form, add 10-20 lbs and repeat the process until
                  either form starts to falter or your bar speed slows
                  signficantly. If you are following 5/3/1, use this 1 Rep Max
                  calculator, and enter that weight as your starting weight. For
                  all other routines, just use the weight you ended on as your
                  starting weight.
                </Typography>
                <Button onClick={() => setExpandInstructions(false)}>
                  hide
                </Button>
              </Card>
            )}
            <Stack direction="row">
              <TextField
                sx={{ margin: '1%', width: 150 }}
                value={weight}
                label="Weight"
                onChange={(e) => setWeight(parseInt(e.target.value))}
              />
              <TextField
                sx={{ margin: '1%', width: 150 }}
                value={reps}
                label="Reps"
                onChange={(e) => setReps(parseInt(e.target.value))}
              />
              <Button
                sx={{ margin: '1%', width: 150 }}
                variant="outlined"
                onClick={calculateMax}
              >
                calculate
              </Button>
              {maxCalculated && (
                <Typography>Your 1 Rep Max for this lift is {max}.</Typography>
              )}
            </Stack>
          </Box>
          <Stack sx={{ margin: '1%' }} direction="row">
            <TextField
              value={startingWeight}
              label="Starting Weight"
              onChange={(e) => setStartingWeight(e.target.value)}
            />
            <TextField
              value={goalWeight}
              label="Goal Weight (optional)"
              onChange={(e) => setGoalWeight(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => onSaveStartingWeight(context.user)}
            >
              Save
            </Button>
          </Stack>
        </div>
      )}
    </MyConsumer>
  );
}

export default Maxes;
