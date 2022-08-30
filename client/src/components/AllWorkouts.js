import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MyConsumer } from './MyContext';
import { useState } from 'react';

function AllWorkouts() {
  const [expand, setExpand] = useState(false);

  return (
    <MyConsumer>
      {(context) => (
        <>
          <Button variant="contained">
            <Link to="/">Back to home</Link>
          </Button>
          {context.workouts.map((workout, index) => (
            <div key={`div ${index}`}>
              <Button
                onClick={(e) => {
                  context.expandWorkout(workout.id);
                  setExpand((expand) => !expand);
                }}
                key={`date ${index}`}
              >
                {workout.date}
              </Button>
            </div>
          ))}
          {expand &&
            context.workoutData.map((workout) => (
              <>
                <p>Lift: {workout.name}</p>
                <p>Weight: {workout.weight}</p>
                <p>Reps: {workout.reps}</p>
              </>
            ))}
        </>
      )}
    </MyConsumer>
  );
}

export default AllWorkouts;
