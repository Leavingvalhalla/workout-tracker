import { Box, TextField, Typography, Checkbox, Button } from '@mui/material';
import { useState } from 'react';

function NewRoutineLiftForm({ onSaveLift }) {
  const [liftId, setLiftId] = useState(1);
  const [index, setIndex] = useState('');
  const [weight, setWeight] = useState(1);
  const [reps, setReps] = useState('');
  const [amrap, setAmrap] = useState(false);

  return (
    <Box>
      // list of lifts goes here
      <Typography>
        The index correlates with which day of the program you perform the lift.
        Eg. if you have three distinct lift days in your program, you would use
        "1" for each lift done on the first day of the program, "2" for the
        second day, etc. Note: you will need as many days of the program (as
        many indices) as there are workouts before you raise the weight.
      </Typography>
      <TextField
        value={index}
        label="index"
        onChange={() => setIndex(e.target.value)}
      />
      <Typography>
        If your routine uses the same weights for every lift until you go up in
        weight, leave this at "1". If your routine uses some percentage of a
        max, enter the percentage as a decimal, eg. for 75% of your max, type
        ".75".
      </Typography>
      <TextField
        value={weight}
        label={'% of max'}
        onChange={() => setWeight(e.target.value)}
      />
      <Typography>
        You need to make a new lift for each set of the workout. eg if you do
        3x5 bench press, you need to make three Lifts, each with 5 reps.
      </Typography>
      <TextField
        value={reps}
        label="reps"
        onChange={() => setReps(e.target.value)}
      />
      <Typography>
        If your routine requires you to only perform the exact number of reps
        specified, leave this unchecked. If your routine allows to do more if
        you're able, check the box. This will show up as a "+" after the rep
        count.
      </Typography>
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

// notes:

// could eventually drag and drop for order, rather than use index
// could have a hover for explanation rather than always have descriptions
