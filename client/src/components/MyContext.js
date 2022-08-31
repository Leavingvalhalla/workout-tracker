import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

function MyProvider(props) {
  const [user, setUser] = useState('');
  const [lifts, setLifts] = useState([]);
  const [loginFailed, setLoginFailed] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);

  function getLifts() {
    fetch(`/user_lifts/${user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setWorkouts(data));
  }

  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((currentUser) => setUser(currentUser));
      }
    });
    fetch('/lifts')
      .then((res) => res.json())
      .then((data) => setLifts(data));
  }, []);

  function onLogout() {
    fetch('/logout', {
      method: 'DELETE',
    });
    setUser('');
  }

  function onLogin(e, username, password) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        setLoginFailed(false);
        res.json().then((userInfo) => setUser(userInfo));
      } else {
        setLoginFailed(true);
      }
    });
  }

  function addLift(e, liftName) {
    fetch('');
  }

  function expandWorkout(workout_id) {
    fetch(`/workouts/${workout_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setWorkoutData(data));
  }

  function onDeleteUserLift(id) {
    fetch(`/user_lifts/${id}`, { method: 'DELETE' }).then(
      setWorkoutData((workoutData) =>
        workoutData.filter((lift) => lift.id !== id)
      )
    );
  }

  function onUpdateUserLift(id, lift_id, workout_id, weight, reps) {
    fetch(`/user_lifts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lift_id,
        workout_id,
        weight,
        reps,
      }),
    }).then(
      setWorkoutData((workoutData) =>
        workoutData.filter((lift) =>
          lift.id !== id ? lift : { id, lift_id, workout_id, weight, reps }
        )
      )
    );
  }

  return (
    <MyContext.Provider
      value={{
        user: user,
        lifts: lifts,
        onLogout: onLogout,
        onLogin: onLogin,
        loginFailed: loginFailed,
        workouts: workouts,
        addLift: addLift,
        getLifts: getLifts,
        expandWorkout: expandWorkout,
        workoutData: workoutData,
        onDeleteUserLift: onDeleteUserLift,
        onUpdateUserLift: onUpdateUserLift,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer };
