import React from 'react'
import { Typography } from '@mui/material';
import RoutineCard from './RoutineCard';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routine from '../types/routine';

function Routines() {
  const [signedUp, setSignedUp] = useState(false);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch('/routines')
      .then((res) => res.json())
      .then((data) => setRoutines(data));
  }, []);

  return (
    <div className="row">
      <div className="column">
        {routines.map((routine: routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            setSignedUp={setSignedUp}
          />
        ))}
      </div>
      <div style={{ width: '50%' }} className="column">
        {signedUp && (
          <Typography variant="h5">
            Great, you're all set! Don't forget to
            <Link to="/maxes"> add your starting weights.</Link>
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Routines;
