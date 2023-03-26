
import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GenerateRota } from 'src/Functions/generate-rota';

import { CreateRotaPage } from './CreateRotaPage';

jest.mock('src/Functions/rota-generator', () => ({
    RotaGenerator: jest.fn((setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData) => {
        setgeneratedRotaFile("abc");
    })
}));

describe('ResponseText component', () => {
    it('should render the initial content', async () => {
        render(<CreateRotaPage />);

        expect(screen.getAllByText("Create rota")[0]).toBeVisible();
        expect(screen.getAllByText("Create rota")[1]).not.toBeVisible();

        const generateButton = screen.getByText(/Generate/);
        //userEvent.click(generateButton);

        expect(screen.getByText('Staff data')).toBeInTheDocument();
        expect(screen.getByText('Use smart demand predict')).toBeInTheDocument();

        const smartPredictCheckbox = screen.getByText('Use smart demand predict').querySelectorAll("input[type='checkbox']")[0] as HTMLInputElement;
        userEvent.click(smartPredictCheckbox);

        expect(smartPredictCheckbox.checked).toBe(true);

    });

    it('should process the click events', async () => {

        render(<CreateRotaPage />);

        const staffDataFile = new File([''], 'staff.csv', { type: 'text/csv' });
        const demandFile = new File([''], 'demand.csv', { type: 'text/csv' });

        const staffDataFileInput = screen.getAllByLabelText('Upload csv')[0];
        fireEvent.change(staffDataFileInput, { target: { files: [staffDataFile] } });

        const demandFileInput = screen.getAllByLabelText('Upload csv')[1];
        fireEvent.change(demandFileInput, { target: { files: [demandFile] } });


        // Stub the initial state
        const myInitialState = 'My Initial State'

        React.useState = jest.fn().mockReturnValue([myInitialState, {}])

        const generateButton = screen.getByText(/Generate/);
        //        userEvent.click(generateButton);

        //      expect(GenerateRota).toHaveBeenCalled();

        //const downloadRotaBtn = await screen.findByText('Download Rota CSV');
        //userEvent.click(downloadRotaBtn);
    });
});
