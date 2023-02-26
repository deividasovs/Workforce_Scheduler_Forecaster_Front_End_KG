
// function generateCSVFileFromString(content: string, filename: string) {
//     // Create a blob
//     var blob = new Blob([content]);
//     var url = URL.createObjectURL(blob);

//     // Create a link to download it
//     var pom = document.createElement('a');
//     pom.href = url;
//     pom.setAttribute('download', filename);
//     pom.click();
// }


// export { generateCSVFileFromString }

/// Write a unit test for the above

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
