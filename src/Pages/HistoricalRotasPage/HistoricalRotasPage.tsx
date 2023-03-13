import { useState } from "react";

import { Box, FormControl, InputLabel, MenuItem, Tab } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { sampleGeneratedRota } from "src/Test-Data/sampleRotas/sample-generated-rota";
import { sampleGeneratedRota2 } from "src/Test-Data/sampleRotas/sample-generated-rota-2";

import { AppLayout } from "src/Components/AppLayout"
import { RotaViewer } from "src/Components/RotaViewer/RotaViewer"
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { HISTORICAL_ROTAS_PAGE_NAME } from "src/consts";



/// TODO: Why is it not changing on different select?
const HistoricalRotasPage = () => {
    const [rotaWk, setRotaWk] = useState('');
    const [value, setValue] = useState('0');
    const [rotaFile, setRotaFile] = useState<String>(() => new String(sampleGeneratedRota))
    const handleSelectChange = (event: SelectChangeEvent) => {
        setRotaWk(event.target.value as string);

        switch (event.target.value as string) {
            case "1":
                setRotaFile(new String(sampleGeneratedRota))
                break;

            case "2":
                setRotaFile(new String(sampleGeneratedRota2))
                break;

            default:
                console.log("Broken rota switch")
                break;
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
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
                            value={rotaWk}
                            label="Rota"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={"1"}>Wk1</MenuItem>
                            <MenuItem value={"2"}>Wk2</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleTabChange}>
                                    <Tab label="Department 1" value="0" />
                                    <Tab label="Department 2" value="1" />
                                    <Tab label="Department 3" value="2" />
                                    <Tab label="Department 4" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="0">
                                <RotaViewer rotaFile={rotaFile} staffCostPerHour={5} hourBudget={10} />
                            </TabPanel>
                            <TabPanel value="1">Department 2</TabPanel>
                            <TabPanel value="2">Department 3</TabPanel>
                            <TabPanel value="3">Department 4</TabPanel>
                        </TabContext>
                    </Box>

                </>
            } />
    )
}

export { HistoricalRotasPage }