import React from 'react'
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
import userRoutineLift from '../types/userRoutineLift';

function Maxes() {
  const [liftName, setLiftName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [max, setMax] = useState<string>('');
  const [startingWeight, setStartingWeight] = useState<string>('');
  // const [goalWeight, setGoalWeight] = useState('');
  const [maxCalculated, setMaxCalculated] = useState<boolean>(false);
  const [expandInstructions, setExpandInstructions] = useState<boolean>(false);

  function calculateMax() {
    let oneRepMax;
    if (reps === '1') {
      oneRepMax = weight;
    } else {
      oneRepMax = (Math.floor(parseInt(weight) * parseInt(reps) * 0.0333 + parseInt(weight)).toString());
    }
    setMax(oneRepMax);
    setMaxCalculated(true);
  }

  interface max {
    id: string,
    lift_id: string,
    max: string
  }

  function onChangeInput(e:any, val:any) {
    console.log(e);
    setLiftName(val)
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <div>
          <Box sx={{ margin: '1%' }}>
            <Autocomplete
              sx={{ maxWidth: 275, margin: '1% 1% 1% 5%' }}
              getOptionLabel={(option: any) => option.name}
              options={context.lifts}
              inputValue={liftName}
              onInputChange={(e: any, val) => onChangeInput(e, val)}
              renderInput={(params) => <TextField label="Lift" {...params} />}
            />
            <Button
              onClick={() =>
                setExpandInstructions(
                  (expandInstructions) => !expandInstructions
                )
              }
            >
              Don't know your starting weights?
            </Button>
            {expandInstructions && (
              <div>
                <Card variant="outlined" sx={{ width: '50%' }}>
                  <Typography>
                    If you don't know what weights to start with for your
                    program, start with an empty barbell and perform the number
                    of reps required for your first set. If this is completed
                    easily, and with good form, add 10-20 lbs and repeat the
                    process until either form starts to falter or your bar speed
                    slows signficantly. If you are following 5/3/1 or GVT, use
                    this 1 Rep Max calculator, and enter that weight as your
                    starting weight. For all other routines, just use the weight
                    you ended on as your starting weight.
                  </Typography>
                </Card>
                <Stack direction="row">
                  <TextField
                    sx={{ margin: '1%', width: 150 }}
                    value={weight}
                    label="Weight"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <TextField
                    sx={{ margin: '1%', width: 150 }}
                    value={reps}
                    label="Reps"
                    onChange={(e) => setReps(e.target.value)}
                  />
                  <Button
                    sx={{ margin: '1%', width: 150 }}
                    variant="outlined"
                    onClick={calculateMax}
                  >
                    calculate
                  </Button>
                  {maxCalculated && (
                    <Typography>
                      Your 1 Rep Max for this lift is {max}.
                    </Typography>
                  )}
                </Stack>
              </div>
            )}
          </Box>
          <Stack sx={{ margin: '1%' }} direction="row">
            <TextField
              value={startingWeight}
              label="Starting Weight"
              onChange={(e) => setStartingWeight(e.target.value)}
            />
            {/* <TextField
              value={goalWeight}
              label="Goal Weight (optional)"
              onChange={(e) => setGoalWeight(e.target.value)}
            /> */}
            <Button
              variant="contained"
              onClick={() =>
                context.onSaveStartingWeight(liftName, startingWeight)
              }
            >
              Save
            </Button>
          </Stack>
          <Stack>
            <Typography>Your routine includes these lifts:</Typography>
            {context.routineLifts.map((lift: userRoutineLift) => (
              <Typography key={lift.name}>
                {lift.name}
                {context.maxes.filter((max: max) => max.lift_id === lift.id)[0] &&
                  ' ✓'}
              </Typography>
            ))}
          </Stack>
        </div>
      )}
    </MyConsumer>
  );
}

export default Maxes;
