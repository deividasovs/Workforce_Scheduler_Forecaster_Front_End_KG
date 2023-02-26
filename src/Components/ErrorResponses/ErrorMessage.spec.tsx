import { render } from "@testing-library/react";

import { ErrorMesssage } from "./ErrorMessage";

describe('ErrorMesssage', () => {
    it('should render the error message', () => {
        const { getByText } = render(<ErrorMesssage error="Error" />);

        expect(getByText('Error')).toBeInTheDocument();
    });
});