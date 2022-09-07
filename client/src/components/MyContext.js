import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

function MyProvider(props) {
  const [user, setUser] = useState('');
  const [lifts, setLifts] = useState([]);
  const [loginFailed, setLoginFailed] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [quoteInfo, setQuoteInfo] = useState([]);

  // retrieves all workouts for a user (AllWorkouts component)
  function getLifts() {
    fetch(`/workouts/${user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      });
  }

  function getQuote() {
    fetch('/quote', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setQuoteInfo(data));
  }

  // checks if user is logged in and seeds the Autocomplete for the Workout component
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

  // Adds new lift options to the autocomplete
  function addLift(e, liftName) {
    e.preventDefault();
    fetch('/lifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: liftName }),
    })
      .then((res) => res.json())
      .then((data) => setLifts([lifts, data]));
  }

  // retrieves the lifts from a specific workout
  function expandWorkout(workout_id) {
    fetch(`/user_lifts/${workout_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkoutData(data);
      });
  }

  function onDeleteUserLift(id) {
    fetch(`/user_lifts/${id}`, { method: 'DELETE' }).then(
      setWorkoutData((workoutData) =>
        workoutData.filter((lift) => lift.user_lift_id !== id)
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWorkoutData((workoutData) =>
          workoutData.map((lift) =>
            lift.user_lift_id !== id
              ? lift
              : {
                  name: data.name,
                  id: data.id,
                  lift_id: data.lift_id,
                  workout_id: data.workout_id,
                  weight: data.weight,
                  reps: data.reps,
                }
          )
        );
      });
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
        getQuote: getQuote,
        quoteInfo: quoteInfo,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer };
