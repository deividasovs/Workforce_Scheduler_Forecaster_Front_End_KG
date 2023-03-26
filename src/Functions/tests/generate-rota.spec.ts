import { GenerateRota } from '../generate-rota';

jest.mock('./Functions/create-schedule');
jest.mock('./Functions/get-predictions');

const mockCreateSchedule = require('./Functions/create-schedule').CreateSchedule;
const mockGetPredictions = require('./Functions/get-predictions').GetPredictions;

//TODO: Clean up here

const staffDataFile = {
    // mock staff data file
};

const demandFile = {
    // mock demand file
};

describe('GenerateRota', () => {
    // beforeEach(() => {
    //     jest.resetAllMocks();
    // });

    // it('should generate a rota with smart predict', async () => {
    //     const departmentNo = '123';
    //     const predictedData = {
    //         // mock predicted data
    //     };
    //     const stats = 'some stats';
    //     const schedule = 'some schedule';

    //     // mock GetPredictions
    //     mockGetPredictions.mockResolvedValueOnce({
    //         json: jest.fn().mockResolvedValueOnce(predictedData),
    //     });

    //     // mock CreateSchedule
    //     mockCreateSchedule.mockResolvedValueOnce({
    //         json: jest.fn().mockResolvedValueOnce({ stats, schedule }),
    //     });

    //     const result = await GenerateRota({
    //         staffDataFile,
    //         departmentNo,
    //         demandFile,
    //         smartPredict: true,
    //     });

    //     expect(mockGetPredictions).toHaveBeenCalledTimes(1);
    //     expect(mockCreateSchedule).toHaveBeenCalledTimes(1);
    //     expect(mockCreateSchedule).toHaveBeenCalledWith(
    //         staffDataFile,
    //         departmentNo,
    //         predictedData
    //     );
    //     expect(result).toEqual({ responseText: stats, generatedRotaFile: schedule });
    // });

    // it('should generate a rota without smart predict', async () => {
    //     const departmentNo = '123';
    //     const stats = 'some stats';
    //     const schedule = 'some schedule';

    //     // mock CreateSchedule
    //     mockCreateSchedule.mockResolvedValueOnce({
    //         json: jest.fn().mockResolvedValueOnce({ stats, schedule }),
    //     });

    //     const result = await GenerateRota({
    //         staffDataFile,
    //         departmentNo,
    //         demandFile,
    //         smartPredict: false,
    //     });

    //     expect(mockCreateSchedule).toHaveBeenCalledTimes(1);
    //     expect(mockCreateSchedule).toHaveBeenCalledWith(staffDataFile);
    //     expect(result).toEqual({ responseText: stats, generatedRotaFile: schedule });
    // });

    // it('should handle errors with smart predict', async () => {
    //     const departmentNo = '123';
    //     const error = new Error('Some error');

    //     // mock GetPredictions
    //     mockGetPredictions.mockRejectedValueOnce(error);

    //     const result = await GenerateRota({
    //         staffDataFile,
    //         departmentNo,
    //         demandFile,
    //         smartPredict: true,
    //     });

    //     expect(mockGetPredictions).toHaveBeenCalledTimes(1);
    //     expect(mockCreateSchedule).not.toHaveBeenCalled();
    //     expect(result).toEqual({ errorMsg: 'There was an issue fetching the optimizer. \n Please try again later or upload manual demand.', responseText: 'error received' });
    // });

    // it('should handle errors without smart predict', async () => {
    //     const departmentNo = '123';
    //     const error = new Error('Some error');

    //     // mock CreateSchedule
    //     mockCreateSchedule.mockRejectedValueOnce(error);

    //     const result = await GenerateRota({
    //         staffDataFile,
    //         departmentNo,
    //         demandFile,
    //         smartPredict: false,
    //     });

    //     expect(mockCreateSchedule).toHaveBeenCalledTimes(1);
    //     expect(mockCreateSchedule).toHaveBeenCalledWith(staffDataFile);
    //     expect(result).toEqual({ errorMsg: 'There was an issue fetching the predictions. \n Please try again later or use smart predict.', responseText: 'error received' });
    // });
});
