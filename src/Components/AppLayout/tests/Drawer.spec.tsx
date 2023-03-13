import { Drawer } from "@mui/material";

describe("Drawer", () => {
    it("should render successfully", () => {
        expect(() => {
            <Drawer />;
        }).not.toThrow();
    });
});