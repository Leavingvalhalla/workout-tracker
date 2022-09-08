import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MyConsumer } from './MyContext';

export default function MaterialUIPickers() {
  return (
    <MyConsumer>
      {(context) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Workout Date"
            inputFormat="MM/DD/YYYY"
            value={context.date}
            onChange={context.handleDateChange}
            renderInput={(params) => (
              <TextField sx={{ width: 150 }} {...params} />
            )}
          />
        </LocalizationProvider>
      )}
    </MyConsumer>
  );
}
