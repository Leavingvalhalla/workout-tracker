import NewLiftForm from './NewLiftForm';
import NewRoutineLiftForm from './NewRoutineLiftForm';
import { Box, TextField, Typography, Checkbox, Button } from '@mui/material';
import { useState } from 'react';

function NewRoutine() {
  const [name, setName] = useState('');

  return (
    <Box>
      <Typography>
        Let's add a new routine! It's a little complicated, but it'll be worth
        it. First up, what's your routine called?
      </Typography>
      <TextField value={name} label="name" />
      <Button>Add lift</Button>
    </Box>
  );
}

export default NewRoutine;

// outline:
// text: need to add a lift?
// import: lift form

// input: name of routine
// button: add new lift
// import: new routineLift

// TODO:

// make a "copy this rep" button?
