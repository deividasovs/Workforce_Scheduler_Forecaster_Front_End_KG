import { render, screen } from "@testing-library/react";
import { AppLayout } from "../AppLayout";

describe("AppLayout", () => {
    it("should render successfully", () => {
        render(<AppLayout
            title="Test Title"
            content={<div>Test Content</div>}
        />);

        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
})
