import { Typography, AppBar, Box, Container } from "@mui/material"

const HeaderBar = () => {
    return (
        <AppBar position="static">
            <Container style={{ paddingTop: "15px", paddingBottom: "15px" }} >
                <Typography variant="h5">KG Workforce Forecaster Scheduler</Typography>
            </Container>
        </AppBar>

    )
}

export { HeaderBar }