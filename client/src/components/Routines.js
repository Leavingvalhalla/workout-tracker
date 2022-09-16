import { Stack, Typography, Card, Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MyConsumer } from './MyContext';

function Routines() {
  const [wendler, setWendler] = useState(false);
  const [reddit, setReddit] = useState(false);
  const [strongCurves, setStrongCurves] = useState(false);
  const [german, setGerman] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  return (
    <MyConsumer>
      {(context) => (
        <Stack>
          <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
            <Typography variant="h4">r/Fitness Beginner Program</Typography>
            <Typography variant="h6">
              Fast progression, moderate volume. Great for newcomers.
            </Typography>
            <Button onClick={() => setReddit((reddit) => !reddit)}>
              {reddit ? 'Hide' : 'see'} sample workout
            </Button>
            <Button
              onClick={() => {
                setSignedUp(true);
                context.setRoutine(1);
              }}
              variant="contained"
            >
              Start Routine
            </Button>
            {reddit && (
              <ul>
                <li>3×5+ Barbell Rows</li>
                <li>3×5+ Bench Press</li>
                <li>3×5+ Squats</li>
              </ul>
            )}
          </Card>
          <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
            <Typography variant="h4">Strong Curves</Typography>
            <Typography variant="h6">
              A good intro program with a healthy balance of strength and
              aesthetics.
            </Typography>
            <Button
              onClick={() => setStrongCurves((strongCurves) => !strongCurves)}
            >
              {strongCurves ? 'Hide' : 'see'} sample workout
            </Button>
            <Button
              onClick={() => {
                setSignedUp(true);
                context.setRoutine(2);
              }}
              variant="contained"
            >
              Start Routine
            </Button>
            {strongCurves && (
              <ul>
                <li>3x10-20 Glute Bridge</li>
                <li>3x10-20 Box Squat</li>
                <li>3x10-20 Dumbbell Romanian Deadlift</li>
                <li>1x10-30 Side Lying Abduction</li>
                <li>1x20-120 second Front Plank</li>
                <li>1x20-60 sec Side Plank From Knees (each side)</li>
              </ul>
            )}
          </Card>
          <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
            <Typography variant="h4">Jim Wendler's 5/3/1</Typography>
            <Typography variant="h6">
              An excellent program for intermediate lifters.
            </Typography>
            <Button onClick={() => setWendler((wendler) => !wendler)}>
              {wendler ? 'Hide' : 'see'} sample workout
            </Button>
            <Button
              onClick={() => {
                setSignedUp(true);
                context.setRoutine(3);
              }}
              variant="contained"
            >
              Start Routine
            </Button>
            {wendler && (
              <ul>
                <li>3x5+ Overhead Press</li>
                <li>1xAMRAP Overhead Press</li>
                <li>3x10 Close Grip Bench</li>
              </ul>
            )}
          </Card>
          <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
            <Typography variant="h4">German Volume Training</Typography>
            <Typography variant="h6">Try not to die.</Typography>
            <Button onClick={() => setGerman((german) => !german)}>
              {german ? 'Hide' : 'see'} sample workout
            </Button>
            <Button onClick={() => context.setRoutine(4)} variant="contained">
              Start Routine
            </Button>
            {german && (
              <ul>
                <li>10x10 Bench Press</li>
                <li>10x10 Barbell Row</li>
                <li>3x10 Chest Fly</li>
                <li>3x10 Lat Pulldown</li>
              </ul>
            )}
          </Card>
          {signedUp && (
            <Typography>
              Great, you're all set! Don't forget to
              <Link to="/maxes"> add your starting weights.</Link>
            </Typography>
          )}
        </Stack>
      )}
    </MyConsumer>
  );
}

export default Routines;
