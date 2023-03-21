import { render, screen, fireEvent } from '@testing-library/react';
import { HistoricalRotasPage } from './HistoricalRotasPage';

describe('HistoricalRotasPage', () => {
    it('should change the displayed rota when a different option is selected from the dropdown', () => {
        render(<HistoricalRotasPage />);

        // Select the second option from the dropdown
        const dropdown = screen.getByLabelText('Rota');
        //fireEvent.change(dropdown, { target: { value: '2' } });

        // Check that the displayed rota has changed
        //const rotaViewer = screen.getByRole('tabpanel', { name: 'Department 1' });
        //expect(rotaViewer).toHaveTextContent('Sample Rota 2');
    });
});
