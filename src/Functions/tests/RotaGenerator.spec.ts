import { RotaGenerator } from '../RotaGenerator'

describe('RotaGenerator', () => {
    it('should call setErrorMsg when smartPredict is true and staffDataFile is undefined', () => {
        const setErrorMsg = jest.fn();
        RotaGenerator(undefined, undefined, true, setErrorMsg, jest.fn(), jest.fn(), jest.fn());
        expect(setErrorMsg).toHaveBeenCalledWith('Please upload staff data');
    });

    it('should call setErrorMsg when smartPredict is false and staffDataFile is undefined', () => {
        const setErrorMsg = jest.fn();
        RotaGenerator(undefined, {}, false, setErrorMsg, jest.fn(), jest.fn(), jest.fn());
        expect(setErrorMsg).toHaveBeenCalledWith('Please upload staff data');
    });

    it('should call setErrorMsg when smartPredict is false, staffDataFile is defined, and demandFile is undefined', () => {
        const setErrorMsg = jest.fn();
        RotaGenerator({}, undefined, false, setErrorMsg, jest.fn(), jest.fn(), jest.fn());
        expect(setErrorMsg).toHaveBeenCalledWith('Please upload demand file or use smart predict');
    });

    it('should return an error message if staffDataFile is undefined', () => {
        const setErrorMsg = jest.fn();
        const setResponseText = jest.fn();
        const setgeneratedRotaFile = jest.fn();
        const setPredictedData = jest.fn();

        RotaGenerator(undefined, {}, true, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData);

        jest.spyOn(console, 'log').mockImplementation(() => { });

        expect(setErrorMsg).toHaveBeenCalledWith('Please upload staff data');
        expect(setResponseText).not.toHaveBeenCalled();
        expect(setgeneratedRotaFile).not.toHaveBeenCalled();
        expect(setPredictedData).not.toHaveBeenCalled();
    });

    it('should call CreateScheduleWithPredictedValuesWrapper if smartPredict is true and staffDataFile is defined', () => {
        const staffDataFile = {};
        const demandFile = {};
        const setErrorMsg = jest.fn();
        const setResponseText = jest.fn();
        const setgeneratedRotaFile = jest.fn();
        const setPredictedData = jest.fn();

        jest.spyOn(console, 'log').mockImplementation(() => { });

        RotaGenerator(staffDataFile, demandFile, true, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData);

        expect(setErrorMsg).not.toHaveBeenCalled();
        expect(setResponseText).toHaveBeenCalled();
        expect(setgeneratedRotaFile).toHaveBeenCalled();
        expect(setPredictedData).toHaveBeenCalled();
    });

    it('should return an error message if demandFile is undefined and smartPredict is false', () => {
        const staffDataFile = {};
        const setErrorMsg = jest.fn();
        const setResponseText = jest.fn();
        const setgeneratedRotaFile = jest.fn();
        const setPredictedData = jest.fn();

        RotaGenerator(staffDataFile, undefined, false, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData);

        expect(setErrorMsg).toHaveBeenCalledWith('Please upload demand file or use smart predict');
        expect(setResponseText).not.toHaveBeenCalled();
        expect(setgeneratedRotaFile).not.toHaveBeenCalled();
    });

    it('should call CreateSchedule if demandFile and staffDataFile are defined and smartPredict is false', () => {
        const staffDataFile = { WeeklyCoverDemand: {} };
        const demandFile = { WeeklyCoverDemand: {} };
        const setErrorMsg = jest.fn();
        const setResponseText = jest.fn();
        const setgeneratedRotaFile = jest.fn();
        const setPredictedData = jest.fn();

        const mockResponse = { text: jest.fn().mockResolvedValueOnce(JSON.stringify({ stats: {}, schedule: {} })) };
        //jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse);

        RotaGenerator(staffDataFile, demandFile, false, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData);

        expect(setErrorMsg).not.toHaveBeenCalled();
        expect(setResponseText).toHaveBeenCalled();
        expect(setgeneratedRotaFile).toHaveBeenCalled();
    });
});
