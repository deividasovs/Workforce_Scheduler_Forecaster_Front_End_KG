import { render } from "@testing-library/react";

import { ErrorMessage } from "./ErrorMessage";

describe('ErrorMessage', () => {
    it('should render the error message', () => {
        const { getByText } = render(<ErrorMessage error="Error" />);
        expect(getByText('Error')).toBeInTheDocument();
    });
});