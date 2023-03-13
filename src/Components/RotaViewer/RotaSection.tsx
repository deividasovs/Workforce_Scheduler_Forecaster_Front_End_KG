import { Button } from "@mui/material"

import { RotaViewer } from "./RotaViewer"
import { generateCSVFileFromString } from 'src/Functions'

const RotaSection = ({ staffCostPerHour, staffBudgetedHours, generatedRotaFile }:
    { staffCostPerHour: number, staffBudgetedHours: number, generatedRotaFile: any }) => (
    <>
        <RotaViewer staffCostPerHour={staffCostPerHour} hourBudget={staffBudgetedHours} rotaFile={generatedRotaFile} />

        <Button variant="contained" color='success' onClick={() => generateCSVFileFromString(generatedRotaFile, "Rota.csv",)}>
            Download Rota CSV
        </Button>
    </>
)



export { RotaSection }