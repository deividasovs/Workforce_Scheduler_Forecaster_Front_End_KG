import { GenerateRota } from '../generate-rota';

import { testPayload } from 'src/Test-Data/test-payload';
import { testDemands } from 'src/Test-Data/test-demands';
import { testRotaGeneratedDataResponse as mockRotaGeneratedDataResponse } from 'src/Test-Data/test-rota-generated-data-response';
import { GetPredictions } from '../get-predictions';
import { CreateSchedule } from '../create-schedule';


jest.mock('src/Functions/create-schedule');

jest.mock('src/Functions/get-predictions');

describe('GenerateRota function', () => {
    it('should return response text and generated Rota file when using smart predict', async () => {
        const departmentNo = 1;

        const mockGetPredictions = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockRotaGeneratedDataResponse),
        }))
        const mockedGetPredictions = GetPredictions as jest.Mock
        mockedGetPredictions.mockReturnValue(mockGetPredictions());

        const mockCreateSchedule = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockRotaGeneratedDataResponse),
        }))
        const mockedCreateSchedule = CreateSchedule as jest.Mock
        mockedCreateSchedule.mockReturnValue(mockCreateSchedule());

        const result = await GenerateRota({ staffDataFile: testPayload, departmentNo, demandFile: testDemands, smartPredict: true });
        expect(result.responseText).toBe(mockRotaGeneratedDataResponse.stats);
        expect(result.generatedRotaFile).toEqual(mockRotaGeneratedDataResponse.schedule);
    });

    it('should return error message when there is an issue fetching predictions with smart predict', async () => {
        const departmentNo = 3;

        const mockGetPredictions = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockRotaGeneratedDataResponse),
        }))
        const mockedGetPredictions = GetPredictions as jest.Mock
        mockedGetPredictions.mockReturnValue(mockGetPredictions());

        const mockCreateSchedule = jest.fn(() => Promise.resolve({
            text: () => Promise.resolve('error received'),
        }))
        const mockedCreateSchedule = CreateSchedule as jest.Mock
        mockedCreateSchedule.mockReturnValue(mockCreateSchedule());

        const result = await GenerateRota({ staffDataFile: testPayload, departmentNo, demandFile: testDemands, smartPredict: true });
        expect(result.errorMsg).toBe('There was an issue fetching the optimizer. \n Please try again later or upload manual demand.');
        expect(result.responseText).toBe('error received');
    });


    it('should return a correct value when not using smart predict', async () => {
        const departmentNo = 2;

        const mockGetPredictions = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockRotaGeneratedDataResponse),
        }))
        const mockedGetPredictions = GetPredictions as jest.Mock
        mockedGetPredictions.mockReturnValue(mockGetPredictions());

        const mockCreateSchedule = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockRotaGeneratedDataResponse),
        }))
        const mockedCreateSchedule = CreateSchedule as jest.Mock
        mockedCreateSchedule.mockReturnValue(mockCreateSchedule());

        const result = await GenerateRota({ staffDataFile: testPayload, departmentNo, demandFile: testDemands, smartPredict: false });
        expect(result.responseText).toBe(mockRotaGeneratedDataResponse.stats);
        expect(result.generatedRotaFile).toEqual(mockRotaGeneratedDataResponse.schedule);
    });
});