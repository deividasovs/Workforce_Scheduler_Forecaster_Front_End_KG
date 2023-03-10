import { render, screen } from "@testing-library/react";

import { StaffCost } from "./StaffCost";

describe("StaffCost", () => {
    it("should should the staff costs", () => {
        const cost = 10
        const actualHours = 40
        const hourBudget = 35

        render(<StaffCost cost={cost} actualHours={actualHours} hourBudget={hourBudget} />);
        expect(screen.getByText("Staffing budget: €350 - 35hrs")).toBeInTheDocument();
    });
}
);