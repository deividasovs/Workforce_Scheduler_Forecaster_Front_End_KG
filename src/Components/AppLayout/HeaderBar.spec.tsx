import { render } from '@testing-library/react';
import { HeaderBar } from './HeaderBar';

describe('HeaderBar', () => {
    it('renders header title', () => {
        const { getByText } = render(<HeaderBar />);

        const headerTitle = getByText('KG Workforce Forecaster Scheduler');
        expect(headerTitle).toBeInTheDocument();
    });
});
