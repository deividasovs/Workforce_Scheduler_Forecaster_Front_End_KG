import Paper from '@mui/material/Paper';

import { TPredictions } from "src/Types"
import { predicted_data } from './data';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
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


// set the minimum to 0 on y axis for the chart
ChartJS.defaults.scale.min = 0;
ChartJS.defaults.scale.max = 400;

const options: ChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const PredictionGraph = ({ predictedData }: { predictedData: TPredictions }) => {
    const labels = predicted_data(predictedData).flatMap((x: any) => x.date)

    const data = {
        labels,
        datasets: [
            {
                label: 'Transaction count',
                data: predicted_data(predictedData).flatMap((x: any) => x.value),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    return (
        <Paper>
            <Line options={options} data={data} />
        </Paper>
    );
}

export { PredictionGraph }