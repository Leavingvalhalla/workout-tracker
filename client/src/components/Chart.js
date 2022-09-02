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

function Chart({ chartInfo, chartTopic }) {
  function parseInfo(workout) {
    if (chartTopic === '1RM' || chartTopic === 'Max Weight') {
      return workout.weight;
    } else if (chartTopic === 'Max Reps');
    {
      return workout.reps;
    }
  }

  const data = {
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: chartTopic,
        },
      },
    },

    labels: chartInfo.map((workout) => workout.date.slice(0, -14)),
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
