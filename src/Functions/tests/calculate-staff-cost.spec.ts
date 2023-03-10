import { CalculateStaffCost } from "../calculate-staff-cost";

const sampleStaffData =
    `Mon,Tue,Wed,Thurs,Fri,Sat,Sun
worker 0,11:00-16:00,09:00-15:00,Off,Off,15:00-20:00,11:00-16:00,15:00-20:00
worker 1,15:00-20:00,Off,15:00-20:00,11:00-16:00,Off,15:00-20:00,11:00-16:00`


describe("CalculateStaffCost", () => {
    it("should return 0", () => {
        const csvData = sampleStaffData
        const rows = csvData.split("\n");
        rows.shift();
        const tableData = rows.map((row: any) => row.split(","));

        expect(CalculateStaffCost(tableData)).toEqual(51);
    });
});