import { render, screen } from "@testing-library/react";

import { PredictionsPage } from './PredictionsPage';
import { samplePredictedData } from "../../Test-Data/predicted-data-return";
import { GetPredictions } from "src/Functions"

jest.mock('src/Functions')

describe('PredictionsPage', () => {
    it('renders with test predictedData', async () => {
        render(<PredictionsPage predictedData={samplePredictedData} />);

        screen.getByRole('checkbox').click();
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('fetches data if not present and not in test mode', async () => {
        const mockGetPredictions = jest.fn(() => Promise.resolve({
            text: () => Promise.resolve(JSON.stringify(samplePredictedData)),
        }))

        const mockedGetPredictions = GetPredictions as jest.Mock
        mockedGetPredictions.mockReturnValue(mockGetPredictions());
        render(<PredictionsPage />);
        expect(mockGetPredictions).toBeCalledTimes(1);
    });

    it('returns an error if fetched incorrectly', async () => {
        const mockGetPredictions = jest.fn(() => Promise.resolve({
            text: () => Promise.reject('Error'),
        }))

        const mockedGetPredictions = GetPredictions as jest.Mock
        mockedGetPredictions.mockReturnValue(mockGetPredictions());
        render(<PredictionsPage />);
        expect(mockGetPredictions).toBeCalledTimes(1);
        expect(await screen.findByText('Error')).toBeInTheDocument();
    });
});