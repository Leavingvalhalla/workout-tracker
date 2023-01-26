import {
  Box,
  TextField,
  Typography,
  Checkbox,
  Button,
  Autocomplete,
} from '@mui/material';
import { useState } from 'react';

function NewRoutineLiftForm() {
  //   const [liftId, setLiftId] = useState(1);
  const [index, setIndex] = useState('');
  const [position, setPosition] = useState('');
  const [weight, setWeight] = useState(1);
  const [reps, setReps] = useState('');
  const [amrap, setAmrap] = useState(false);
  const [indexInfo, setIndexInfo] = useState(false);
  const [positionInfo, setPositionInfo] = useState(false);
  const [weightInfo, setWeightInfo] = useState(false);
  const [repsInfo, setRepsInfo] = useState(false);
  const [amrapInfo, setAmrapInfo] = useState(false);

  function onSaveLift(index, position, weight, reps, amrap) {
    return;
  }

  return (
    <div className="col">
      {/* <Autocomplete /> */}
      <div className="row">
        <TextField
          sx={{ width: '100px' }}
          value={index}
          label="index"
          onChange={(e) => setIndex(e.target.value)}
        />
        <Button onClick={() => setIndexInfo((indexInfo) => !indexInfo)}>
          What's this?
        </Button>
        {indexInfo && (
          <Typography>
            The index correlates with which day of the program you perform the
            lift. Eg. if you have three distinct lift days in your program, you
            would use "1" for each lift done on the first day of the program,
            "2" for the second day, etc. Note: you will need as many days of the
            program (as many indices) as there are workouts before you raise the
            weight.
          </Typography>
        )}
      </div>
      <div className="row">
        <TextField
          sx={{ width: '100px' }}
          value={position}
          label="position"
          onChange={(e) => setPosition(e.target.value)}
        />
        <Button
          onClick={() => setPositionInfo((positionInfo) => !positionInfo)}
        >
          What's this?
        </Button>
        {positionInfo && (
          <Typography>
            The position is for the order of lifts on a given day. Eg some
            programs prefer to do arm workouts before leg workouts. The position
            assures that the lifts are in the correct order on each day.
          </Typography>
        )}
      </div>
      <div className="row">
        <TextField
          sx={{ width: '100px' }}
          value={weight}
          label={'% of max'}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Button onClick={() => setWeightInfo((weightInfo) => !weightInfo)}>
          What's this?
        </Button>
        {weightInfo && (
          <Typography>
            If your routine uses the same weights for every lift until you go up
            in weight, leave this at "1". If your routine uses some percentage
            of a max, enter the percentage as a decimal, eg. for 75% of your
            max, type ".75".
          </Typography>
        )}
      </div>
      <div className="row">
        <TextField
          sx={{ width: '100px' }}
          value={reps}
          label="reps"
          onChange={(e) => setReps(e.target.value)}
        />
        <Button onClick={() => setRepsInfo((repsInfo) => !repsInfo)}>
          What's this?
        </Button>
        {repsInfo && (
          <Typography>
            You need to make a new lift for each set of the workout. eg if you
            do 3x5 bench press, you need to make three Lifts, each with 5 reps.
          </Typography>
        )}
      </div>
      <div className="row">
        <Checkbox onChange={(e) => setAmrap((amrap) => (amrap = !amrap))} />
        <Typography>AMRAP?</Typography>
        <Button onClick={() => setAmrapInfo((amrapInfo) => !amrapInfo)}>
          What's this?
        </Button>
        {amrapInfo && (
          <Typography>
            If your routine requires you to only perform the exact number of
            reps specified, leave this unchecked. If your routine allows to do
            more if you're able, check the box. This will show up as a "+" after
            the rep count.
          </Typography>
        )}
      </div>
      <Button
        sx={{ width: '100px' }}
        variant="contained"
        onClick={onSaveLift(index, position, weight, reps, amrap)}
      >
        Save
      </Button>
    </div>
  );
}
export default NewRoutineLiftForm;

// TODO:
// import list of lifts
// test checkbox
// Move all descriptions to NewRoutine

// notes:

// could eventually drag and drop for order, rather than use index
// could have a hover for explanation rather than always have descriptions
