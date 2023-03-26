
import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreateRotaPage } from './CreateRotaPage';
import { GenerateRota } from 'src/Functions/generate-rota';

import { testRotaGeneratedDataResponse as mockRotaGeneratedDataResponse } from 'src/Test-Data/test-rota-generated-data-response';

jest.mock('src/Functions/generate-rota');

describe('ResponseText component', () => {
    it('should render the initial content', async () => {
        render(<CreateRotaPage />);

        expect(screen.getAllByText("Create rota")[0]).toBeVisible();
        expect(screen.getAllByText("Create rota")[1]).not.toBeVisible();

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

        const mockGenerateRota = jest.fn(() => Promise.resolve({
            text: () => Promise.resolve(mockRotaGeneratedDataResponse),
        }))
        const mockedCreateSchedule = GenerateRota as jest.Mock
        mockedCreateSchedule.mockReturnValue(mockGenerateRota());

        const generateButton = screen.getByText(/Generate/);
        fireEvent.click(generateButton);

        expect(mockGenerateRota).toHaveBeenCalled();
    });
});
