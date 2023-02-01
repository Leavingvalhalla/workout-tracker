import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

function MyProvider(props) {
  const [user, setUser] = useState('');
  const [lifts, setLifts] = useState([]);
  const [liftNames, setLiftNames] = useState([]);
  const [maxes, setMaxes] = useState([]);
  const [loginFailed, setLoginFailed] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [todaysLifts, setTodaysLifts] = useState([]);
  const [routineLifts, setRoutineLifts] = useState([]);
  const [workoutId, setWorkoutId] = useState('');
  const [deloads, setDeloads] = useState([]);
  const [increases, setIncreases] = useState([]);
  const [liftNameError, setLiftNameError] = useState();
  const [userLiftError, setUserLiftError] = useState();

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

  useEffect(() => {
    fetch('/lifts')
      .then((res) => res.json())
      .then((data) => setLiftNames(data));
  }, []);

  // checks if user is logged in and seeds the Autocomplete for the Workout component
  useEffect(() => {
    fetch('/me').then((res) => {
      if (res.ok) {
        res.json().then((currentUser) => {
          setUser(currentUser);
        });
      }
    });
    fetch('/lifts', {
      method: 'GET',
    })
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
  }, [user, maxes]);

  // retrieves all lifts for routine
  useEffect(() => {
    if (user.routine_id) {
      fetch(`/routine_lifts/${user.routine_id}`)
        .then((res) => res.json())
        .then((data) => {
          setRoutineLifts(data);
        });
    }
  }, [user, maxes]);

  function onLogout() {
    fetch('/logout', {
      method: 'DELETE',
    });
    setUser('');
    setWorkoutId('');
    setTodaysLifts([]);
    setCurrentWorkout([]);
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
      body: JSON.stringify({ lift_name: liftName }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setLifts([lifts, data]);
        });
      } else {
        res.json().then((data) => {
          setLiftNameError(data.errors[0]);
        });
      }
    });
  }

  // sets routine for user
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

  // grabs current maxes to make it easier to set new ones
  useEffect(() => {
    fetch(`/maxes`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setMaxes(data));
  }, [user]);

  function onSaveStartingWeight(liftName, startingWeight) {
    const info = { user_id: user.id, lift: liftName, lift_max: startingWeight };
    const currentLift = lifts.filter((lift) => lift.name === liftName);
    const currentMax = maxes.filter((max) => max.lift_id === currentLift[0].id);
    if (currentMax[0]) {
      fetch(`/maxes/${currentMax[0].id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          setMaxes((maxes) =>
            maxes.map((max) => (max.lift_id === data.id ? data : max))
          );
        });
    } else {
      fetch('/maxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          setMaxes((maxes) => [...maxes, data]);
        });
    }
  }

  // gets today's date to make sure even if the app is closed, you continue your workout from the same day
  function getToday() {
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ];
    return (
      year.toString() + '-' + (month + 1).toString() + '-' + day.toString()
    );
  }

  // Double checks that there isn't already a workout created for today, in case page/cache is refreshed
  function onLogSet(liftName, weight, reps) {
    if (liftName === '') {
      setUserLiftError('no lift selected');
    } else if (weight === '' || weight === 0) {
      setUserLiftError('no weight selected');
    } else if (reps === '' || reps === 0) {
      setUserLiftError('no reps selected');
    } else {
      setUserLiftError('');
      if (!workoutId) {
        const today = getToday();
        fetch(`/workouts/byDate/${today}}`, {
          method: 'GET',
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setWorkoutId(data[0].workout_id);
              postLift(data[0].workout_id, liftName, weight, reps);
            });
          } else {
            createWorkout(liftName, weight, reps);
          }
        });
      } else {
        postLift(workoutId, liftName, weight, reps);
      }
    }
  }

  // creates new workoutId
  function createWorkout(liftName, weight, reps) {
    const today = getToday();
    fetch('/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workout_id: workoutId,
        user_id: user.id,
        date: today,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkoutId(data.id);
        postLift(data.id, liftName, weight, reps);
      });
  }

  // creates new UserLift with current workoutId
  function postLift(id, liftName, weight, reps) {
    fetch('/user_lifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workout_id: id,
        lift_name: liftName,
        weight,
        reps,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCurrentWorkout([...currentWorkout, data]);
        });
      } else {
        res.json().then((data) => {
          setUserLiftError(data);
        });
      }
    });
  }

  // takes user to next day of routine, and adds info to user about lifts that need to change
  function finishRoutineWorkout() {
    fetch(`/finish_routine_workout/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIncreases(data.increases);
        setDeloads(data.deloads);
      });
  }

  return (
    <MyContext.Provider
      value={{
        user,
        lifts,
        liftNames,
        onLogout,
        onLogin,
        loginFailed,
        workouts,
        addLift,
        getLifts,
        setRoutine,
        todaysLifts,
        routineLifts,
        finishRoutineWorkout,
        onLogSet,
        currentWorkout,
        maxes,
        onSaveStartingWeight,
        deloads,
        increases,
        liftNameError,
        userLiftError,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

const MyConsumer = MyContext.Consumer;

export { MyProvider, MyConsumer, MyContext };
