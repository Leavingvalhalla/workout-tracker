import { Stack, Typography, Card, Button } from '@mui/material';
import { useState } from 'react';

function Routines() {
  const [wendler, setWendler] = useState(false);
  const [reddit, setReddit] = useState(false);
  const [strongCurves, setStrongCurves] = useState(false);
  const [nSuns, setNSuns] = useState(false);

  return (
    <Stack>
      <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
        <Typography variant="h4">r/Fitness Beginner Program</Typography>
        <Typography variant="h6">
          Fast progression, moderate volume. Great for newcomers.
        </Typography>
        <Button onClick={() => setReddit((reddit) => !reddit)}>
          {reddit ? 'Hide' : 'see'} sample workout
        </Button>
        <Button variant="contained">Start Routine</Button>
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
          A good intro program for women who want to get stronger while
          maintaining a focus on aesthetics.
        </Typography>
        <Button
          onClick={() => setStrongCurves((strongCurves) => !strongCurves)}
        >
          {strongCurves ? 'Hide' : 'see'} sample workout
        </Button>
        <Button variant="contained">Start Routine</Button>
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
        <Button variant="contained">Start Routine</Button>
        {wendler && (
          <ul>
            <li>3x5+ Overhead Press</li>
            <li>1xAMRAP Overhead Press</li>
            <li>3x10 Close Grip Bench</li>
          </ul>
        )}
      </Card>
      <Card variant="outlined" sx={{ margin: '1%', width: 450 }}>
        <Typography variant="h4">nSuns LP</Typography>
        <Typography variant="h6">I hope you like volume.</Typography>
        <Button onClick={() => setNSuns((nSuns) => !nSuns)}>
          {nSuns ? 'Hide' : 'see'} sample workout
        </Button>
        <Button variant="contained">Start Routine</Button>
        {nSuns && (
          <ul>
            <li>1x8 Bench Press</li>
            <li>1x6 Bench Press</li>
            <li>3x4 Bench Press</li>
            <li>1x5 Bench Press</li>
            <li>1x6 Bench Press</li>
            <li>1x7 Bench Press</li>
            <li>1x8 Bench Press</li>
            <li>1x6 Overhead Press</li>
            <li>1x5 Overhead Press</li>
            <li>1x3 Overhead Press</li>
            <li>1x5 Overhead Press</li>
            <li>1x7 Overhead Press</li>
            <li>1x4 Overhead Press</li>
            <li>1x6 Overhead Press</li>
            <li>1x8 Overhead Press</li>
            <li>Assistance: Chest, Arms, Back</li>
          </ul>
        )}
      </Card>
    </Stack>
  );
}

// Thoughts: They're going to need to be able to set a 1RM. Do you set it before you start? If not, is there a way to
// do it automatically at the beginning? Do you just leave those numbers up all the time that can be changed on the routine page?

// You could have separate inputs for each lift of a Workout. Is that better or worse than having one that autofills? Probably better.

// Probably want the 1RMs to be attached to the User. Almost certainly.

// Biggest question: How to make the migrations for the Routines? Could make a RoutineLift table that stores a routine_id - probably worth doing.
// How, then, to cycle through the lifts, how to know where you are in the routine in a given workout? RoutineLifts could have a 'position'
// number, and the User could save the position they're currently at. If you do that, you could do a whole day workout as one position,
// as long as you do the "all the inputs on one page" thing. I think that's the way to do it, because it's nice to see your whole workout
// at once. Then maybe a button to say "okay, I'm done with this workout", because with assistance stuff there's no way to be sure
// a workout is done automatically.

export default Routines;
