import { render } from "@testing-library/react";

import { HistoricalRotasPage } from "./HistoricalRotasPage";

describe('historical rotas page', () => {
    it('renders', () => {
        const { getByText } = render(<HistoricalRotasPage />);
        const headerTitle = getByText('hello');
        expect(headerTitle).toBeInTheDocument();
    });
});