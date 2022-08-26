import { useEffect } from 'react';

function AllWorkouts({ user }) {
  useEffect(() => {
    fetch(`/all_workouts/${user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [user.id]);

  return;
}

export default AllWorkouts;
