import { render, screen } from '@testing-library/react';
import { PredictionTable } from './PredictionTable';

const testData = {
    transaction_count: [1, 2, 3],
    dept1: [10, 20, 30],
    dept2: [11, 21, 31],
    dept3: [12, 22, 32],
    dept4: [13, 23, 33]
};

describe('PredictionTable', () => {
    it('should display a table with the correct headers', () => {
        render(<PredictionTable data={testData} />);

        const timeHeader = screen.getByText('Time');
        const transactionHeader = screen.getByText('Transactions');
        const dept1Header = screen.getByText('Department 1');
        const dept2Header = screen.getByText('Department 2');
        const dept3Header = screen.getByText('Department 3');
        const dept4Header = screen.getByText('Department 4');

        expect(timeHeader).toBeInTheDocument();
        expect(transactionHeader).toBeInTheDocument();
        expect(dept1Header).toBeInTheDocument();
        expect(dept2Header).toBeInTheDocument();
        expect(dept3Header).toBeInTheDocument();
        expect(dept4Header).toBeInTheDocument();
    });
});
