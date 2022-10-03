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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ chartInfo, chartTopic, setCurrentWorkout }) {
  function parseInfo(workout) {
    if (chartTopic === 'Estimated 1RM') {
      return workout.weight * workout.reps * 0.0333 + workout.weight;
    } else if (chartTopic === 'Max Weight') {
      return workout.weight;
    } else if (chartTopic === 'Max Reps') {
      return workout.reps;
    } else {
      return workout.volume;
    }
  }

  const data = {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      onClick: (e, legendItem, legend) => {
        console.log(chartInfo[legendItem[0].index]);
        let id = chartInfo[legendItem[0].index].id;
        fetch(`/workout_by_lift_id/${id}`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => setCurrentWorkout(data));
      },
    },

    labels: chartInfo.map((workout) => workout.date.slice(5)),
    datasets: [
      {
        label: chartTopic,
        data: chartInfo.map((workout) => parseInfo(workout)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={data.options} data={data} />;
}

export default Chart;
