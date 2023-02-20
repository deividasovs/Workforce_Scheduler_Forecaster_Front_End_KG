import { render, screen } from '@testing-library/react';
import { ResponseText } from './ResponseText';

describe('ResponseText component', () => {
    it('should render the text content', () => {
        const text = 'Hello, world!';
        render(<ResponseText text={text} />);
        const textElement = screen.getByText(text);
        expect(textElement).toBeInTheDocument();
    });
});
