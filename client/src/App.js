import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Workout from './components/Workout';
import AllWorkouts from './components/AllWorkouts';
import NewLiftForm from './components/NewLiftForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/all_workouts" element={<AllWorkouts />} />
        <Route path="/add_lift" element={<NewLiftForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
