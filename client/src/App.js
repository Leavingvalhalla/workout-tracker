import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Workout from './components/Workout';
import AllWorkouts from './components/AllWorkouts';
import NewLiftForm from './components/NewLiftForm';
import WorkoutData from './components/WorkoutData';
import Routines from './components/Routines';
import ContinueRoutine from './components/ContinueRoutine';
import Maxes from './components/Maxes';
import FinishedWorkout from './components/FinishedWorkout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#aa2c2d',
      },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
      </ThemeProvider>

      <Routes>
        <Route
          index
          path="/"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Home />
            </ThemeProvider>
          }
        />
        <Route
          path="/signup"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Signup />
            </ThemeProvider>
          }
        />
        <Route
          path="/workout"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Workout />
            </ThemeProvider>
          }
        />
        <Route
          path="/all_workouts"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AllWorkouts />
            </ThemeProvider>
          }
        />
        <Route
          path="/add_lift"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NewLiftForm />
            </ThemeProvider>
          }
        />
        <Route
          path="/workout_data"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <WorkoutData />
            </ThemeProvider>
          }
        />
        <Route
          path="/routines"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routines />
            </ThemeProvider>
          }
        />
        <Route
          path="/maxes"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Maxes />
            </ThemeProvider>
          }
        />
        <Route
          path="/continue"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ContinueRoutine />
            </ThemeProvider>
          }
        />
        <Route
          path="/finished"
          element={
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <FinishedWorkout />
            </ThemeProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
