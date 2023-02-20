import { render, screen, getByText, fireEvent } from '@testing-library/react';
import { MainPage } from './Main-Page';

describe('ResponseText component', () => {
    it('should render the text content', () => {
        const { getByText } = render(<MainPage />);

        //expect(getByText('Generate')).toBeInTheDocument();

        /// Fire event on button that says Generate

        const generateButton = screen.getByText('Generate');
        //fireEvent.click(generateButton);


        expect(getByText('Response')).toBeInTheDocument();
        expect(getByText('KG Workforce Forecaster Scheduler')).toBeInTheDocument();
        expect(getByText('Upload staff data')).toBeInTheDocument();
        expect(getByText('Use smart predict')).toBeInTheDocument();
    });
});
