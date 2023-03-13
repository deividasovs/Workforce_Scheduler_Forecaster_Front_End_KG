import { Button, Select, MenuItem } from "@mui/material"

import { RotaViewer } from "./RotaViewer"
import { generateCSVFileFromString } from 'src/Functions'

const RotaSection = ({ staffCostPerHour, staffBudgetedHours, generatedRotaFile }:
    { staffCostPerHour: number, staffBudgetedHours: number, generatedRotaFile: any }) => (
    <>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            value={"Next week"}
        //label="Age"
        //onChange={handleChange}
        >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <RotaViewer staffCostPerHour={staffCostPerHour} hourBudget={staffBudgetedHours} rotaFile={generatedRotaFile} />

        <Button variant="contained" color='success' onClick={() => generateCSVFileFromString(generatedRotaFile, "Rota.csv",)}>
            Download Rota CSV
        </Button>
    </>
)



export { RotaSection }