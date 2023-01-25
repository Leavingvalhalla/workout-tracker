import { Box, TextField, Typography, Checkbox, Button } from '@mui/material';
import { useState } from 'react';

function NewRoutineLiftForm({ onSaveLift }) {
  const [liftId, setLiftId] = useState(1);
  const [index, setIndex] = useState('');
  const [weight, setWeight] = useState(1);
  const [reps, setReps] = useState('');
  const [amrap, setAmrap] = useState(false);
  const [indexInfo, setIndexInfo] = useState(false);
  const [weightInfo, setWeightInfo] = useState(false);
  const [repsInfo, setRepsInfo] = useState(false);
  const [amrapInfo, setAmrapInfo] = useState(false);

  return (
    <Box>
      <Button onClick={() => setIndexInfo((indexInfo) => !indexInfo)}>
        What's this?
      </Button>
      {indexInfo && (
        <Typography>
          The index correlates with which day of the program you perform the
          lift. Eg. if you have three distinct lift days in your program, you
          would use "1" for each lift done on the first day of the program, "2"
          for the second day, etc. Note: you will need as many days of the
          program (as many indices) as there are workouts before you raise the
          weight.
        </Typography>
      )}
      <TextField
        value={index}
        label="index"
        onChange={() => setIndex(e.target.value)}
      />
      <Button onClick={() => setWeightInfo((weightInfo) => !weightInfo)}>
        What's this?
      </Button>
      {weightInfo && (
        <Typography>
          If your routine uses the same weights for every lift until you go up
          in weight, leave this at "1". If your routine uses some percentage of
          a max, enter the percentage as a decimal, eg. for 75% of your max,
          type ".75".
        </Typography>
      )}
      <TextField
        value={weight}
        label={'% of max'}
        onChange={() => setWeight(e.target.value)}
      />
      <Button onClick={() => setRepsInfo((repsInfo) => !repsInfo)}>
        What's this?
      </Button>
      {repsInfo && (
        <Typography>
          You need to make a new lift for each set of the workout. eg if you do
          3x5 bench press, you need to make three Lifts, each with 5 reps.
        </Typography>
      )}
      <TextField
        value={reps}
        label="reps"
        onChange={() => setReps(e.target.value)}
      />
      <Button onClick={() => setAmrapInfo((amrapInfo) => !amrapInfo)}>
        What's this?
      </Button>
      {amrapInfo && (
        <Typography>
          If your routine requires you to only perform the exact number of reps
          specified, leave this unchecked. If your routine allows to do more if
          you're able, check the box. This will show up as a "+" after the rep
          count.
        </Typography>
      )}
      <Checkbox onChange={() => setAmrap((amrap) => (amrap = !amrap))} />
      <Button onClick={onSaveLift(liftId, index, weight, reps, amrap)}>
        Save
      </Button>
    </Box>
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
