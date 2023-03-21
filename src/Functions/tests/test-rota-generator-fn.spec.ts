import { TestRotaGenerator } from "../test-rota-generator-fn";

describe('TestRotaGenerator', () => {
    it('sample test', () => {
        const setResponseText = jest.fn();
        const setgeneratedRotaFile = jest.fn();
        const setPredictedData = jest.fn();

        TestRotaGenerator(setResponseText, setgeneratedRotaFile, setPredictedData)

        expect(setResponseText).toHaveBeenCalledWith("Generating..")
    });
});