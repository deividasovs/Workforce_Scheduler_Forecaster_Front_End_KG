import { render, screen } from "@testing-library/react";

import { RotaViewer } from "../RotaViewer";

const sampleCsvData =
    `Mon,Tue,Wed,Thurs,Fri,Sat,Sun
worker 0,11:00-16:00,09:00-15:00,Off,Off,15:00-20:00,11:00-16:00,15:00-20:00
worker 1,15:00-20:00,Off,15:00-20:00,11:00-16:00,Off,15:00-20:00,11:00-16:00
worker 2,Off,Off,11:00-16:00,15:00-20:00,11:00-16:00,11:00-16:00,09:00-15:00
worker 3,Off,15:00-20:00,09:00-15:00,09:00-15:00,09:00-15:00,09:00-15:00,Off
worker 4,09:00-15:00,09:00-15:00,09:00-15:00,09:00-15:00,09:00-15:00,Off,Off
worker 5,09:00-15:00,11:00-16:00,09:00-15:00,09:00-15:00,09:00-15:00,Off,Off`

describe("RotaViewer", () => {
    it("should render", async () => {
        const staffCostPerHour = 10
        const hourBudget = 35
        render(<RotaViewer rotaFile={sampleCsvData} staffCostPerHour={staffCostPerHour} hourBudget={hourBudget} />);

        expect(screen.getByText("Sun")).toBeVisible();
        expect(await screen.findByText("worker 0")).toBeVisible();
    });
});