import { render, screen } from '@testing-library/react';
import { Line } from 'react-chartjs-2';

import { samplePredictedData } from 'src/Test-Data/predicted-data-return';
import { PredictionGraph } from '.././PredictionGraph';

jest.mock('react-chartjs-2', () => ({
    Line: () => null,
}));

describe('PredictionGraph', () => {
    it('displays the correct label on the chart', async () => {
        render(<PredictionGraph predictedData={samplePredictedData} />);

        //expect(mockedGetPredictions).toBeCalled();

        //expect(findByText('Transaction count')).toBeInTheDocument();
    });

    it('displays the correct data on the chart', () => {
        const { getByLabelText } = render(<PredictionGraph predictedData={samplePredictedData} />);
        /* const chart = getByLabelText('Chart.js Line Chart') as HTMLCanvasElement;
        const chartData = chart.toDataURL();
        const expectedData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Replace with expected chart data
        expect(chartData).toEqual(expectedData); */
    });
});
