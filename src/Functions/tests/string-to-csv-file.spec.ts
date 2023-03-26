import { generateCSVFileFromString } from '../string-to-csv-file';

describe('generateCSVFileFromString', () => {
    it('it should generate a CSV file from the given string', () => {
        const content = 'name,age\nJohn,30\nJane,25\n';
        const filename = 'test.csv';

        global.URL.createObjectURL = jest.fn();

        const createElementSpy = jest.spyOn(document, 'createElement');

        generateCSVFileFromString(content, filename);

        expect(createElementSpy).toHaveBeenCalledWith('a');
    });
});
