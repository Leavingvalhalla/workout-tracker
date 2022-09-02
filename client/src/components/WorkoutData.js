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

function WorkoutData() {
  const [liftName, setLiftName] = useState('');
  const [period, setPeriod] = useState('');
  const [chart, setChart] = useState('');
  //   const labels, setLabels] = useState('')

  const periods = ['1m', '3m', '6m', '1y', 'all'];

  const charts = ['Estimated 1RM', 'Max Weight', 'Max Reps', 'Workout Volume'];

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
          <p>Lift</p>
          <Autocomplete
            sx={{ maxWidth: 275 }}
            getOptionLabel={(option) => option.name}
            options={context.lifts}
            inputValue={liftName}
            label="lift"
            onInputChange={(e, val) => setLiftName(val)}
            renderInput={(params) => <TextField {...params} />}
          />
          <p>Period</p>
          <Autocomplete
            sx={{ maxWidth: 150 }}
            getOptionLabel={(option) => option}
            options={periods}
            inputValue={period}
            label="period"
            onInputChange={(e, val) => setPeriod(val)}
            renderInput={(params) => <TextField {...params} />}
          />
          <p>Graph</p>
          <Autocomplete
            sx={{ maxWidth: 225 }}
            getOptionLabel={(option) => option}
            options={charts}
            inputValue={chart}
            label="period"
            onInputChange={(e, val) => setChart(val)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Line options={options} data={data} />
        </>
      )}
    </MyConsumer>
  );
}

export default WorkoutData;
