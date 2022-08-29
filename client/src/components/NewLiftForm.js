import { MyConsumer } from './MyContext';
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

function NewLiftForm({ toggleLiftForm }) {
  const [liftName, setLiftName] = useState('');

  return (
    <MyConsumer>
      {(context) => (
        <div>
          <Box onSubmit={(e) => context.addLift(e, liftName)}>
            <TextField
              onChange={(e) => setLiftName(e.target.value)}
              value={liftName}
              label="Lift Name"
            />
            <Button
              variant="contained"
              type="submit"
              onClick={() => toggleLiftForm}
            >
              Add Lift
            </Button>
          </Box>
        </div>
      )}
    </MyConsumer>
  );
}
export default NewLiftForm;
