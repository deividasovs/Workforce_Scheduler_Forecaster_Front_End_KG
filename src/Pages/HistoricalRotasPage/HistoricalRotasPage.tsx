/*
Note: This is Proof of concept code, it is not production ready and is used only to demonstrate the historicl rotas feature
*/

import { useState } from "react";

import { Box, FormControl, InputLabel, MenuItem, Tab } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TabPanel, TabContext, TabList } from "@mui/lab";

import { AppLayout } from "src/Components/AppLayout"
import { RotaViewer } from "src/Components/RotaViewer"

import { HISTORICAL_ROTAS_PAGE_NAME } from "src/consts";

import { rotaSelectStructure } from "src/Test-Data/sampleRotas/rota-select-structure";

const HistoricalRotasPage = () => {
    const [rotaWk, setRotaWk] = useState('wk1');
    const [dept, setDept] = useState('dept1');
    const [rotaFile, setRotaFile] = useState<String>(() => rotaSelectStructure.dept1.wk1)


    const handleSelectChange = (event: SelectChangeEvent) => {
        const rotaWk = event.target.value as string
        const newRota = rotaSelectStructure[dept][rotaWk]
        setRotaWk(rotaWk);
        setRotaFile(newRota)
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        const newRota = rotaSelectStructure[newValue][rotaWk]
        setDept(newValue);
        setRotaFile(newRota)
    };

    return (
        <AppLayout
            title={HISTORICAL_ROTAS_PAGE_NAME}
            content={
                <>
                    <FormControl style={{ minWidth: "100px" }}>
                        <InputLabel id="rota-select-label">Rota</InputLabel>
                        <Select
                            labelId="rota-select-label"
                            id="rota-select"
                            size="small"
                            value={rotaWk}
                            inputProps={{ "data-testid": "content-input" }}
                            label="Rota"
                            onChange={handleSelectChange}>
                            <MenuItem value={"wk1"}>Wk1</MenuItem>
                            <MenuItem value={"wk2"}>Wk2</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={dept}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleTabChange}>
                                    <Tab label="Department 1" value="dept1" />
                                    <Tab label="Department 2" value="dept2" />
                                    <Tab label="Department 3" value="dept3" />
                                    <Tab label="Department 4" value="dept4" />
                                </TabList>
                            </Box>
                            <TabPanel value="dept1">
                                <RotaViewer rotaFile={rotaFile} staffCostPerHour={16.4} hourBudget={160} />
                            </TabPanel>
                            <TabPanel value="dept2">
                                <RotaViewer rotaFile={rotaFile} staffCostPerHour={13.6} hourBudget={124} />
                            </TabPanel>
                            <TabPanel value="dept3">
                                <RotaViewer rotaFile={rotaFile} staffCostPerHour={12.2} hourBudget={100} />
                            </TabPanel>
                            <TabPanel value="dept4">
                                <RotaViewer rotaFile={rotaFile} staffCostPerHour={11.96} hourBudget={60} />
                            </TabPanel>
                        </TabContext>
                    </Box>

                </>
            } />
    )
}

export { HistoricalRotasPage }