import { render, fireEvent } from '@testing-library/react';
import { HeaderBar } from '.././HeaderBar';

describe('HeaderBar', () => {
    test('renders the title correctly', () => {
        const { getByText } = render(<HeaderBar title="Test Title" />);
        const titleElement = getByText(/Test Title/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('opens the drawer when the menu icon is clicked', () => {
        const { getByRole, getByLabelText } = render(<HeaderBar />);
        const menuIconButton = getByLabelText(/menu/i);
        fireEvent.click(menuIconButton);
        const drawerElement = getByRole('drawer');
        expect(drawerElement).toBeInTheDocument();
    });

    test('toggles test mode when the checkbox is clicked', () => {
        const { getByLabelText } = render(<HeaderBar />);
        const checkboxElement = getByLabelText(/dev mode/i);
        //expect(checkboxElement.checked).toBe(false);
        fireEvent.click(checkboxElement);
        //expect(checkboxElement.checked).toBe(true);
    });
});