import { Box, Button, Typography } from '@mui/material';
import { MyConsumer } from './MyContext';
import Workout from './Workout';
import RoutineLift from './RoutineLift';
import { useState } from 'react';

function ContinueRoutine() {
  const [expandLiftForm, setExpandLiftForm] = useState(false);

  function clickAccessoryButton() {
    setExpandLiftForm((expandLiftForm) => !expandLiftForm);
  }

  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <Typography>
            You are on day {context.user.routine_position} of your routine.
          </Typography>
          <Box>
            {context.todaysLifts.map((lift, index) => (
              <RoutineLift
                key={`routineLift ${index}`}
                lift={lift}
                index={index}
                context={context}
              />
            ))}
          </Box>
          <Button onClick={clickAccessoryButton}>
            Doing some accessory work?
          </Button>
          {expandLiftForm && <Workout />}
          <Button
            sx={{ margin: '1%' }}
            variant="contained"
            onClick={context.finishRoutineWorkout}
          >
            Finish Workout
          </Button>
        </div>
      )}
    </MyConsumer>
  );
}

// Maybe still figure out a way to render things differently if they're different lift names. Would be good for this
// page and the regular workout page.

export default ContinueRoutine;
