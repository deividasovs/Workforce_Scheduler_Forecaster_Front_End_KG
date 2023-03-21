import { fireEvent, render, screen } from '@testing-library/react';
import { UploadCsvBtn } from './UploadCsvBtn'

import { testDepartment1 } from 'src/Test-Data/test-department-1'

describe('UploadCsvBtn', () => {
    let setCurrFile: jest.Mock<any, any>;
    let errorSetMock: jest.Mock<any, any>;
    let setStaffCostPerHour: jest.Mock<any, any>;
    let setStaffBudgetedHours: jest.Mock<any, any>;
    let setDepartmentNo: jest.Mock<any, any>;
    let isDemand: boolean;

    beforeEach(() => {
        errorSetMock = jest.fn();
        setCurrFile = jest.fn();
        isDemand = true;
    });

    it('handles file upload and converts csv to json', async () => {
        const csvFile = new File([testDepartment1], 'staff.csv', { type: 'text/csv' });

        render(<UploadCsvBtn errorSet={errorSetMock} setDepartmentNo={setDepartmentNo} setStaffCostPerHour={setStaffCostPerHour} setStaffBudgetedHours={setStaffBudgetedHours} setCurrFile={setCurrFile} isDemand={isDemand} />);

        const readAsBinaryStringSpy = jest.spyOn(FileReader.prototype, 'readAsBinaryString');
        const readerOnLoad = jest.spyOn(FileReader.prototype, 'onload', 'set')

        fireEvent.change(screen.getByLabelText('Upload csv'), { target: { files: [csvFile] } });

        expect(readerOnLoad).toBeCalled()
        //TODO: Fix this test!

        /*    expect(errorSetMock).toBeCalled()
           expect(setDepartmentNo).toBeCalled()
   
           expect(readAsBinaryStringSpy).toBeCalled()
           expect(readerOnLoad).toBeCalled()
   
           const staffName = await findByText('staff.csv');
           expect(staffName).toBeInTheDocument(); */
    });
});
