import React from 'react'
import { useState, useEffect } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import routine from '../types/routine';

function CustomRoutines() {
  const [newRoutineName, setNewRoutineName] = useState<string>('');
  const [customRoutines, setCustomRoutines] = useState<routine[]>([]);
  const [newRoutine, setNewRoutine] = useState(false);

  useEffect(() => {
    fetch('/custom_routine_names', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setCustomRoutines(data));
  }, []);

  function onSaveRoutine() {
    fetch('/routines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newRoutineName }),
    })
      .then((res) => res.json())
      .then((data) => setCustomRoutines([...customRoutines, data]));
    setNewRoutineName('');
  }

  return (
    <div>
      <Typography>
        Click the routine you want to edit, or click NEW to start a brand new
        one.
      </Typography>
      <Button
        variant="contained"
        onClick={() => setNewRoutine((newRoutine) => !newRoutine)}
      >
        New
      </Button>
      {newRoutine && (
        <div>
          <TextField
            sx={{ margin: '5px' }}
            onChange={(e) => setNewRoutineName(e.target.value)}
            label="Routine Name"
            value={newRoutineName}
          />
          <Button variant="contained" onClick={onSaveRoutine}>
            save
          </Button>
        </div>
      )}
      <div className="col">
        {customRoutines.map((routine) => (
          <Button key={routine.id}>
            <Link
              style={{ textDecoration: 'none', color: '#aa2c2d' }}
              to={`/edit_routine/${routine.id}`}
            >
              {routine.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CustomRoutines;
