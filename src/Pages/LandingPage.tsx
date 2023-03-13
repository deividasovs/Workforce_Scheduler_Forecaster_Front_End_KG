import { Button } from "@mui/material"

import { AppLayout } from "src/Components/AppLayout"
import { GENERATE_ROTA_PAGE_EP } from "src/consts"

const LandingPage = () => {

    return (
        <AppLayout content={
            <>
                <p>Welcome to the project!</p>
                <p>Ready to create your first rota?</p>
                <Button variant="contained" color='success' href={GENERATE_ROTA_PAGE_EP}>Continue</Button>
            </>
        }
        />
    )
}

export { LandingPage }