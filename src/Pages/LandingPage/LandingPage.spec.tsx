import { screen, render } from "@testing-library/react";

import { LandingPage } from "./LandingPage";

describe('LandingPage', () => {
    it('should render successfully', () => {
        render(<LandingPage />)

        expect(screen.getByText(/Welcome to the Workforce Forecaster and Scheduler project/i)).toBeInTheDocument();
        expect(screen.getByText(/Deividas Ovsianikovas/i)).toBeInTheDocument();
    });
});