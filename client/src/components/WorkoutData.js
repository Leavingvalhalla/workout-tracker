import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Autocomplete, TextField, Button } from '@mui/material';
import { MyConsumer } from './MyContext';
import Chart from './Chart';

function WorkoutData() {
  const [liftName, setLiftName] = useState('');
  const [period, setPeriod] = useState('1m');
  const [chart, setChart] = useState('Estimated 1RM');
  const [workoutData, setWorkoutData] = useState([]);
  const [topic, setTopic] = useState('');
  const [chartFailed, setChartFailed] = useState(false);
  //   const labels, setLabels] = useState('')

  const periods = ['1m', '3m', '6m', '1y', 'all'];

  const charts = ['Estimated 1RM', 'Max Weight', 'Max Reps', 'Workout Volume'];

  function handleChartSubmit() {
    fetch(`/chart/${liftName}/${period}/${chart}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        data.error ? setChartFailed(true) : dataResponse(data);
        // ;
      });
  }

  function dataResponse(data) {
    setChartFailed(false);
    setWorkoutData(data);
    setTopic(chart);
  }

  return (
    <MyConsumer>
      {(context) => (
        <>
          <Button>
            <Link to="/">Back to Home</Link>
          </Button>
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
          <Button onClick={handleChartSubmit}>Submit</Button>
          {!chartFailed && <Chart chartInfo={workoutData} chartTopic={topic} />}
          {chartFailed && <p>We don't seem to have any data for that.</p>}
        </>
      )}
    </MyConsumer>
  );
}

export default WorkoutData;
