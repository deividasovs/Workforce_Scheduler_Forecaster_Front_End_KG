import { Typography } from "@mui/material"

const HeaderBar = () => {
    /// Return a header that spans the whole page and is 100 height
    return (
        <div className="header-bar" style={{ backgroundColor: 'white' }}>
            <div className="header-bar__title">
                <Typography variant="h5">KG Workforce Forecaster Scheduler</Typography>
            </div>
        </div>
    )

}



export { HeaderBar }