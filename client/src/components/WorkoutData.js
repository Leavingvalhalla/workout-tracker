import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { MyConsumer } from './MyContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

// Charts:
// Estimated 1RM
// Max Weight
// Max Reps
// Workout Volume

//Periods:
// 1m, 3m, 6m, 1y, all

function WorkoutData() {
  const [liftName, setLiftName] = useState('');

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <MyConsumer>
      {(context) => (
        <>
          <Autocomplete
            sx={{ maxWidth: 275 }}
            getOptionLabel={(option) => option.name}
            options={context.lifts}
            inputValue={liftName}
            label="lift"
            onInputChange={(e, val) => setLiftName(val)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Line options={options} data={data} />
        </>
      )}
    </MyConsumer>
  );
}

export default WorkoutData;
