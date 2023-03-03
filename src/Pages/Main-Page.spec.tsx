import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainPage } from './Main-Page';

describe('ResponseText component', () => {
    it('should render the initial content', async () => {
        const { getByText, findByText } = render(<MainPage />);

        expect(getByText('KG Workforce Forecaster Scheduler')).toBeInTheDocument();

        const generateButton = getByText('Generate');
        userEvent.click(generateButton);

        expect(getByText('Response')).toBeInTheDocument();
        expect(getByText('KG Workforce Forecaster Scheduler')).toBeInTheDocument();
        expect(getByText('Upload staff data')).toBeInTheDocument();
        expect(getByText('Use smart demand predict')).toBeInTheDocument();

        const smartPredictCheckbox = getByText('Use smart demand predict').querySelectorAll("input[type='checkbox']")[0] as HTMLInputElement;
        userEvent.click(smartPredictCheckbox);

        expect(smartPredictCheckbox.checked).toBe(true);

    });

    it('should process the click events', async () => {
        const { getByText, getAllByLabelText } = render(<MainPage />);

        const staffDataFile = new File([''], 'staff.csv', { type: 'text/csv' });
        const demandFile = new File([''], 'demand.csv', { type: 'text/csv' });

        const staffDataFileInput = getAllByLabelText('Upload csv')[0];
        fireEvent.change(staffDataFileInput, { target: { files: [staffDataFile] } });

        const demandFileInput = getAllByLabelText('Upload csv')[1];
        fireEvent.change(demandFileInput, { target: { files: [demandFile] } });


        const generateButton = getByText('Generate');
        userEvent.click(generateButton);





    });
});
