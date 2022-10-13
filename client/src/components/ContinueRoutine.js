import { Box, Button, Typography } from '@mui/material';
import { MyConsumer } from './MyContext';
import Workout from './Workout';
import RoutineLift from './RoutineLift';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
            You are on day {context.user.routine_position} of{' '}
            {context.user.routine_id === 1
              ? 'r/Fitness Beginner Program'
              : context.user.routine_id === 2
              ? 'Strong Curves'
              : context.user.routine_id === 3
              ? "Wendler's 5/3/1"
              : context.user.routine_id === 4
              ? 'German Volume Training'
              : null}
            .
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
          <Link sx={{ textDecoration: 'none' }} to="/finished">
            <Button
              sx={{ margin: '1%', textDecoration: 'none' }}
              variant="contained"
              onClick={context.finishRoutineWorkout}
            >
              Finish Workout
            </Button>
          </Link>
        </div>
      )}
    </MyConsumer>
  );
}

export default ContinueRoutine;
