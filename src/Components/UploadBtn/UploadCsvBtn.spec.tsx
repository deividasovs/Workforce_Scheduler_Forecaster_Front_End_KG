import { fireEvent, render } from '@testing-library/react';
import { UploadCsvBtn } from './UploadCsvBtn';

describe('UploadCsvBtn', () => {
    let setCurrFile: jest.Mock<any, any>;
    let errorSetMock: jest.Mock<any, any>;
    let isDemand: boolean;

    beforeEach(() => {
        errorSetMock = jest.fn();
        setCurrFile = jest.fn();
        isDemand = true;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the button', () => {
        const { getByText } = render(<UploadCsvBtn errorSet={errorSetMock} setCurrFile={setCurrFile} isDemand={isDemand} />);
        expect(getByText('Upload csv')).toBeInTheDocument();
    });

    it('handles file upload and converts csv to json', async () => {
        const csvData = 'name,email,role\nJohn,john@example.com,developer\nJane,jane@example.com,manager\n';
        const csvFile = new File([csvData], 'staff.csv', { type: 'text/csv' });
        const { getByLabelText, findByText } = render(<UploadCsvBtn errorSet={errorSetMock} setCurrFile={setCurrFile} isDemand={isDemand} />);

        const readAsBinaryStringSpy = jest.spyOn(FileReader.prototype, 'readAsBinaryString');
        const readerOnLoad = jest.spyOn(FileReader.prototype, 'onload', 'set')

        fireEvent.change(getByLabelText('Upload csv'), { target: { files: [csvFile] } });

        expect(readAsBinaryStringSpy).toBeCalled()
        expect(readerOnLoad).toBeCalled()

        const staffName = await findByText('staff.csv');
        expect(staffName).toBeInTheDocument();
    });
});
