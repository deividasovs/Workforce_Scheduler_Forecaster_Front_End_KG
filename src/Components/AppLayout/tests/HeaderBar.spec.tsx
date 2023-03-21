import { render, fireEvent, screen } from '@testing-library/react';
import { HeaderBar } from '.././HeaderBar';

import { GENERATE_ROTA_PAGE_NAME, FORECAST_PAGE_NAME } from 'src/consts';

describe('HeaderBar', () => {
    test('renders the title correctly', () => {
        const { getByText } = render(<HeaderBar title="Test Title" />);
        const titleElement = getByText(/Test Title/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('opens the drawer when the menu icon is clicked', () => {
        render(<HeaderBar />);
        const menuIconButton = screen.getByTestId("MenuIcon")
        fireEvent.click(menuIconButton);
        expect(screen.getByText(GENERATE_ROTA_PAGE_NAME)).toBeVisible()
        expect(screen.getByText(FORECAST_PAGE_NAME)).toBeVisible()
    });
});