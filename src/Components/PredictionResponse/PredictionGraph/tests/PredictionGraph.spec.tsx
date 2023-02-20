import { render } from '@testing-library/react';
import { PredictionGraph } from '.././PredictionGraph';
import { TPredictions } from "src/Types";


//TODO: Fix this test
describe('PredictionGraph', () => {

    const predictedData: TPredictions = {
        transaction_count: [10, 20, 30, 40, 50, 60, 70, 80],
        dept1: [5, 10, 15, 20, 25, 30, 35, 40],
        dept2: [3, 6, 9, 12, 15, 18, 21, 24],
        dept3: [1, 2, 3, 4, 5, 6, 7, 8],
        dept4: [1, 2, 3, 4, 5, 6, 7, 8],
    };

    it('should render the component without errors', () => {
        render(<PredictionGraph predictedData={predictedData} />);
    });

    it('should display the correct label on the chart', () => {
        const { getByText } = render(<PredictionGraph predictedData={predictedData} />);

        expect(getByText('Transaction count')).toBeInTheDocument();
    });

    it('should display the correct data on the chart', () => {
        const { getByLabelText } = render(<PredictionGraph predictedData={predictedData} />);
        const chart = getByLabelText('Chart.js Line Chart') as HTMLCanvasElement;
        const chartData = chart.toDataURL();
        const expectedData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Replace with expected chart data
        expect(chartData).toEqual(expectedData);
    });
});
