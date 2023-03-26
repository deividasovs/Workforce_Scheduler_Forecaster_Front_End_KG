import { render, screen } from "@testing-library/react";

import { Drawer } from "../Drawer";

import { GENERATE_ROTA_PAGE_NAME, HISTORICAL_ROTAS_PAGE_NAME } from 'src/consts';

describe("Drawer", () => {
    it("should render successfully", () => {

        render(<Drawer isOpen={true} />)
        expect(screen.getByText(HISTORICAL_ROTAS_PAGE_NAME)).toBeInTheDocument();
        expect(screen.getByText(GENERATE_ROTA_PAGE_NAME)).toBeInTheDocument();
    });
});