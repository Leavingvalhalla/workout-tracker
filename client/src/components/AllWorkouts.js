import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function AllWorkouts({ user }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(`/all_workouts/${user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }, [user.id]);

  return (
    <>
      <Button variant="contained">
        <Link to="/">Back to home</Link>
      </Button>
      {workouts.map((workout, index) => (
        <div key={`div ${index}`}>
          <p key={`date ${index}`}>{workout.date}</p>
          <p key={`lift ${index}`}>{workout.lift_id}</p>
          <p key={`weight ${index}`}>{workout.weight}</p>
          <p key={`reps ${index}`}>{workout.reps}</p>
        </div>
      ))}
    </>
  );
}

export default AllWorkouts;
