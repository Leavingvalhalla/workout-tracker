import { MyConsumer } from './MyContext';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

function NewLiftForm({ toggleLiftForm }) {
  const [liftName, setLiftName] = useState('');

  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <Box onSubmit={(e) => context.addLift(e, liftName)}>
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
                onClick={() => toggleLiftForm}
              >
                Add Lift
              </Button>
            </Stack>
          </Box>
        </div>
      )}
    </MyConsumer>
  );
}
export default NewLiftForm;
