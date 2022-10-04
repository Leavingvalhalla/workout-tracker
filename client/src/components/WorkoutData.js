import { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { MyConsumer } from './MyContext';
import Chart from './Chart';

function WorkoutData() {
  const [liftName, setLiftName] = useState('');
  const [period, setPeriod] = useState('1m');
  const [chart, setChart] = useState('Estimated 1RM');
  const [chartInfo, setChartInfo] = useState([]);
  const [topic, setTopic] = useState('');
  const [chartFailed, setChartFailed] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState([]);

  const periods = ['1m', '3m', '6m', '1y', 'all'];

  const charts = ['Estimated 1RM', 'Max Weight', 'Max Reps', 'Workout Volume'];

  function handleChartSubmit() {
    fetch(`/chart/${liftName}/${period}/${chart}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        data.error ? setChartFailed(true) : dataResponse(data);
      });
  }

  function dataResponse(data) {
    setChartFailed(false);
    setChartInfo(data);
    setTopic(chart);
  }

  return (
    <MyConsumer>
      {(context) => (
        <div className="app">
          <div className="row">
            <div className="column">
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
              <Button
                sx={{ width: '15%' }}
                className="button"
                onClick={handleChartSubmit}
              >
                Submit
              </Button>
            </div>
            <div className="column">
              <div className="row">
                {currentWorkout.map((lift, i) => (
                  <Card
                    sx={{ width: '15%', margin: '2%', display: 'inline-block' }}
                    key={i}
                  >
                    <CardContent>
                      <Typography>
                        {lift.weight} x {lift.reps}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <Typography>
            Click a node to see all sets of that lift for the day.
          </Typography>
          {!chartFailed && (
            <Chart
              chartInfo={chartInfo}
              chartTopic={topic}
              setCurrentWorkout={setCurrentWorkout}
            />
          )}
          {chartFailed && <p>We don't seem to have any data for that.</p>}
          {currentWorkout.length > 0 && <div></div>}
        </div>
      )}
    </MyConsumer>
  );
}

export default WorkoutData;

// TODO: You're so close!!! Make the new data look nice.
// Then test everything again,
// Then make everything else look nice.
