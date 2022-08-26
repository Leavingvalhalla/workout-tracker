import { useState, useEffect } from 'react';

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
      {workouts.map((workout) => (
        <>
          <p>{workout.date}</p>
          <p>{workout.lift_id}</p>
          <p>{workout.weight}</p>
          <p>{workout.reps}</p>
        </>
      ))}
    </>
  );
}

export default AllWorkouts;
