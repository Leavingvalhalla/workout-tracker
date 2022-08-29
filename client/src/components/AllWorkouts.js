import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MyConsumer } from './MyContext';

function AllWorkouts() {
  return (
    <MyConsumer>
      {(context) => (
        <>
          <Button variant="contained">
            <Link to="/">Back to home</Link>
          </Button>
          {context.workouts.map((workout, index) => (
            <div key={`div ${index}`}>
              <p key={`date ${index}`}>{workout.date}</p>
              <p key={`lift ${index}`}>{workout.lift_id}</p>
              <p key={`weight ${index}`}>{workout.weight}</p>
              <p key={`reps ${index}`}>{workout.reps}</p>
            </div>
          ))}
        </>
      )}
    </MyConsumer>
  );
}

export default AllWorkouts;
