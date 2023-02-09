import React from 'react'
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
import lift from '../types/lift';
import chartWorkout from '../types/chartWorkout';
import workout from '../types/workout';


function WorkoutData() {
  const [liftName, setLiftName] = useState<string>('');
  const [period, setPeriod] = useState<string>('1m');
  const [chart, setChart] = useState<string>('Estimated 1RM');
  const [chartInfo, setChartInfo] = useState<workout[]>([]);
  const [topic, setTopic] = useState<string>('');
  const [chartFailed, setChartFailed] = useState<boolean>(false);
  const [currentWorkout, setCurrentWorkout] = useState<chartWorkout[]>([]);

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

  function dataResponse(data: workout[]) {
    setChartFailed(false);
    setChartInfo(data);
    setTopic(chart);
  }
  
  function onChartChange(e:any, val:any) {
    console.log(e, val)
  setChart(val)
  }

  function onLiftChange(e: React.SyntheticEvent) {
    if (e) {
      const target = e.target as HTMLInputElement;
      setLiftName(target.value)}
  }

  function onPeriodChange(e: React.SyntheticEvent) {
    if (e) {
      const target = e.target as HTMLInputElement;
      setPeriod(target.value)}
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <div className="app">
          <div className="row">
            <div className="column">
              <p>Lift</p>
              <Autocomplete
                sx={{ maxWidth: 275 }}
                getOptionLabel={(option: lift) => option.name}
                options={context.lifts}
                inputValue={liftName}
                onInputChange={(e) => onLiftChange(e)}
                renderInput={(params) => <TextField {...params} />}
              />
              <p>Period</p>
              <Autocomplete
                sx={{ maxWidth: 150 }}
                getOptionLabel={(option) => option}
                options={periods}
                inputValue={period}
                onInputChange={(e) => onPeriodChange(e)}
                renderInput={(params) => <TextField {...params} />}
              />
              <p>Graph</p>
              <Autocomplete
                sx={{ maxWidth: 225 }}
                getOptionLabel={(option) => option}
                options={charts}
                inputValue={chart}
                onInputChange={(e, val) => onChartChange(e, val)}
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
                {currentWorkout.map((lift: chartWorkout, i) => (
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
