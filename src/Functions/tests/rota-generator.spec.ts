import { RotaGenerator } from '../rota-generator'

import { GetPredictions } from '../get-predictions';
import { samplePredictedData } from 'src/Test-Data/predicted-data-return';

jest.mock('src/Functions/get-predictions');
jest.mock('src/Functions/create-schedule')

// TODO: Expand on this test and clean up the rota-generator.ts file`
describe('RotaGenerator', () => {
    it('sample test', () => {
        const staffDataFile = { WeeklyCoverDemand: {} };
        const demandFile = { WeeklyCoverDemand: {} };
        const departmentNo = 1
        const smartPredict = true
        const setErrorMsg = jest.fn();
        const setResponseText = jest.fn();
        const setgeneratedRotaFile = jest.fn();
        const setPredictedData = jest.fn();
        const predictedData = null

        const mockGetPredictions = jest.fn(() => Promise.resolve({
            text: () => Promise.resolve(JSON.stringify(samplePredictedData)),
        }))

        const mockedGetPredictions = GetPredictions as jest.Mock
        mockedGetPredictions.mockReturnValue(mockGetPredictions());

        RotaGenerator(
            {
                staffDataFile, departmentNo, demandFile, smartPredict,
                setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData, predictedData
            }
        )

        //expect(setErrorMsg).toHaveBeenCalledWith('Please upload staff data');

        expect(mockedGetPredictions).toHaveBeenCalled();
    });
});
