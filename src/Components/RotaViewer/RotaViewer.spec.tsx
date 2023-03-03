import { render } from "@testing-library/react";

import { RotaViewer } from "./RotaViewer";

describe("RotaViewer", () => {
    it("should render", () => {
        const { getByText } = render(<RotaViewer rotaFile={null} />);
        expect(getByText("Rota Viewer")).toBeVisible();
    });
});

/*

*/