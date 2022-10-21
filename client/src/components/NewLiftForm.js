import { MyConsumer } from './MyContext';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';

function NewLiftForm({ toggleLiftForm }) {
  const [liftName, setLiftName] = useState('');

  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <Box>
            <Stack spacing={2} direction="row">
              <TextField
                onChange={(e) => setLiftName(e.target.value)}
                value={liftName}
                label="Lift Name"
              />
              <Button
                className="button"
                variant="contained"
                type="submit"
                onClick={(e) => context.addLift(e, liftName)}
              >
                Add Lift
              </Button>
              {context.liftNameError == "Name can't be blank" && (
                <Typography>You need to type a name!</Typography>
              )}
              {context.liftNameError == 'Name has already been taken' && (
                <Typography>That lift is already in the system!</Typography>
              )}
            </Stack>
          </Box>
        </div>
      )}
    </MyConsumer>
  );
}
export default NewLiftForm;
