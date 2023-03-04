import { render, screen } from "@testing-library/react";

import { StaffCost } from "./StaffCost";

describe("StaffCost", () => {
    it("should should the staff costs", () => {
        render(<StaffCost />);
        expect(screen.getByText("Staffing budget: €1000 - 400hrs")).toBeInTheDocument();
    });
}
);