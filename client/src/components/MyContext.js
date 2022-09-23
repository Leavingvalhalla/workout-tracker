import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

function MyProvider(props) {
  const [user, setUser] = useState('');
  const [lifts, setLifts] = useState([]);
  const [loginFailed, setLoginFailed] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [todaysLifts, setTodaysLifts] = useState([]);
  const [routineLifts, setRoutineLifts] = useState([]);

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

  // retrieves lifts/weights/reps for next workout in routine
  useEffect(() => {
    if (user) {
      fetch(`/routine_lifts/${user.routine_id}/${user.routine_position}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setTodaysLifts(data);
        });
    }
  }, [user]);

  // retrieves all lifts for routine
  useEffect(() => {
    if (user.routine_id) {
      fetch(`/routine_lifts/${user.routine_id}`)
        .then((res) => res.json())
        .then((data) => {
          setRoutineLifts(data);
        });
    }
  }, [user]);

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

  function setRoutine(routine_id) {
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ routine_id, routine_position: 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }

  function finishRoutineWorkout() {
    fetch(`/users/next_routine_pos/${user.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
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
        setRoutine: setRoutine,
        todaysLifts: todaysLifts,
        routineLifts: routineLifts,
        finishRoutineWorkout,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer };
