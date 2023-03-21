import { render, screen, fireEvent } from '@testing-library/react';
import { HistoricalRotasPage } from './HistoricalRotasPage';

/// TODO: Fix this test
describe('HistoricalRotasPage', () => {
    it('should change the displayed rota when a different option is selected from the dropdown', async () => {
        render(<HistoricalRotasPage />);
        // Workaround to test some MUI input components https://stackoverflow.com/questions/57110557/react-testing-library-the-given-element-does-not-have-a-value-setter-when-firee
        const contentInput = screen.getByTestId("content-input");
        fireEvent.change(contentInput, { target: { value: 1 } });

        fireEvent.change(contentInput, { target: { value: 2 } });

        /// Log an error
        fireEvent.change(contentInput, { target: { value: 0 } });
    });
});
