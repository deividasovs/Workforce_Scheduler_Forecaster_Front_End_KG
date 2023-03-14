import { verifyCSVFormat } from "../verify-csv-format";

import { testDepartment1 } from "src/Test-Data/test-department-1";
import { manualDemand } from "src/Test-Data/manual-demand";

describe("verifyCSVFormat", () => {
    it("should return true if the csv file is in the correct format", () => {
        const result = verifyCSVFormat(manualDemand, true);
        expect(result).toBe(true);
    });
    it("should return false if the csv file is not in the correct format", () => {
        const csvFile = "Day,Demand\nmon,1\ntue,2";
        const result = verifyCSVFormat(csvFile, true);
        expect(result).toBe(false);
    });
    it("should return true if the csv file is in the correct format", () => {
        const result = verifyCSVFormat(testDepartment1, false);
        expect(result).toBe(true);
    }
    );
    it("should return false if the csv file is not in the correct format", () => {
        const csvFile = "Dept,Staff,Requests,FixedAssignment\nA,1,2,3\nB,4,5,6\nC,7,8";
        const isDemand = false;
        const result = verifyCSVFormat(csvFile, false);
        expect(result).toBe(false);
    });
});