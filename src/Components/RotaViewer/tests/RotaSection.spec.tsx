import { render, fireEvent } from '@testing-library/react';
import { RotaSection } from '../RotaSection';

import { generateCSVFileFromString } from 'src/Functions';

jest.mock('src/Functions')

describe('RotaSection', () => {
    const staffCostPerHour = 10;
    const staffBudgetedHours = 40;
    const generatedRotaFile = 'dummy rota file';

    it('should render RotaViewer and Download Rota CSV button', () => {
        const { getByText } = render(
            <RotaSection
                staffCostPerHour={staffCostPerHour}
                staffBudgetedHours={staffBudgetedHours}
                generatedRotaFile={generatedRotaFile}
            />,
        );

        expect(getByText('Download Rota CSV')).toBeInTheDocument();
        expect(getByText('Download Rota CSV')).toBeInstanceOf(HTMLButtonElement);
    });

    it('should call generateCSVFileFromString function with correct arguments on button click', () => {
        const { getByText } = render(
            <RotaSection
                staffCostPerHour={staffCostPerHour}
                staffBudgetedHours={staffBudgetedHours}
                generatedRotaFile={generatedRotaFile}
            />,
        );

        const button = getByText('Download Rota CSV');
        fireEvent.click(button);

        expect(generateCSVFileFromString).toHaveBeenCalledWith(generatedRotaFile, 'Rota.csv');
    });
});
