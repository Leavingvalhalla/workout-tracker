import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers() {
  const [value, setValue] = useState(dayjs('2022-08-01T17:00:00'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Workout Date"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
