import React from 'react'
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { MyConsumer } from './MyContext';
import Workout from './Workout';
import RoutineLift from './RoutineLift';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import userRoutineLift from '../types/userRoutineLift';

function ContinueRoutine() {
  const [expandLiftForm, setExpandLiftForm] = useState<boolean>(false);
  const [expandInstructions, setExpandInstructions] = useState<boolean>(false);

  function clickAccessoryButton() {
    setExpandLiftForm((expandLiftForm) => !expandLiftForm);
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <div className="app">
          <Card variant="outlined" sx={{ width: '50%' }}>
            <CardContent>
              <Typography variant="h5">
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
            </CardContent>
          </Card>
          <Button
            onClick={() =>
              setExpandInstructions((expandInstructions) => !expandInstructions)
            }
          >
            New to this?
          </Button>
          {expandInstructions && (
            <Card variant="outlined" sx={{ width: '50%' }}>
              <CardContent>
                <Typography>
                  Complete each rep, in order. If there is a '+' next to the rep
                  count, do as many reps as you can with good form. Do not do
                  any assistance work until your main lifts are completed.
                </Typography>
              </CardContent>
            </Card>
          )}
          <Box>
            {context.todaysLifts.map((lift: userRoutineLift, index: number) => (
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
          <Link style={{ textDecoration: 'none' }} to="/finished">
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
