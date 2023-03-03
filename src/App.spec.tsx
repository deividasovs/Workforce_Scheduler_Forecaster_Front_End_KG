import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders MainPage', () => {
    const { getByText } = render(<App />);
    const mainPage = getByText('KG Workforce Forecaster Scheduler');
    expect(mainPage).toBeInTheDocument();
  });
});