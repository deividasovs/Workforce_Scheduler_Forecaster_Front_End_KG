import { CSSProperties } from "react"
import { Button } from "@mui/material"

import { AppLayout } from "src/Components/AppLayout"
import { GENERATE_ROTA_PAGE_EP } from "src/consts"

const LandingPage = () => {

    const footerStyle: CSSProperties = {
        position: "absolute",
        bottom: "0",
    }

    return (
        <>
            <AppLayout
                content={
                    <>
                        <h2>Welcome to the Workforce Forecaster and Scheduler project</h2>
                        This software allows you to:
                        <ul>
                            <li>
                                Upload data about your staff and quickly generate an optimized rota based on the uploaded staff data.
                            </li>
                            <li>
                                Generate and view staff demand forecasts and use smart predict to use the forecasted demand when generating the rota.
                            </li>
                            <li>
                                View historically generated rotas.
                            </li>
                        </ul>

                        <p>Ready to create your first rota?</p>
                        <Button variant="contained" color='success' href={GENERATE_ROTA_PAGE_EP}>Continue</Button>

                        <footer>
                            <div style={footerStyle}>

                                Maynooth University final year project 2023
                                <br />
                                Deividas Ovsianikovas
                                <br />
                                Find it on <a href="https://github.com/deividasovs/Workforce_Scheduler_Forecaster_Front_End_KG">Github</a>
                            </div>
                        </footer>
                    </>
                }
            />
        </>
    )
}

export { LandingPage }