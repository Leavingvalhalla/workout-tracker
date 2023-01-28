import { useState, useEffect } from 'react';
import { Typography, Button, TextField } from '@mui/material';

function CustomRoutines() {
  const [newRoutineName, setNewRoutineName] = useState('');
  const [customRoutines, setCustomRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState(false);

  useEffect(() => {
    fetch('/custom_routine_names', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setCustomRoutines(data));
  }, []);

  function editRoutine(routineId) {
    // route to new page with correct routine
  }

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
            onChange={(e) => setNewRoutineName(e.target.value)}
            value={newRoutineName}
          />
          <Button variant="contained" onClick={onSaveRoutine}>
            save
          </Button>
        </div>
      )}
      <div className="col">
        {customRoutines.map((routine) => (
          <Button key={routine.id} onClick={() => editRoutine(routine.id)}>
            {routine.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CustomRoutines;
