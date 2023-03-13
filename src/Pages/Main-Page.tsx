import { useState } from 'react'
import { Container, Button, Typography, Checkbox, CircularProgress, Tabs, Tab, Box } from "@mui/material"

import { AppLayout } from 'src/Components/AppLayout'
import { UploadCsvBtn } from 'src/Components/UploadBtn'
import { ResponseText } from 'src/Components/ResponseTxt'
import { ErrorMessage } from 'src/Components/ErrorResponses/ErrorMessage'
import { PredictionSection } from 'src/Components/PredictionResponse/PredictionSection'
import { RotaSection } from 'src/Components/RotaViewer'

import { RotaGenerator } from 'src/Functions/rota-generator'
import { TestRotaGenerator } from 'src/Functions/test-rota-generator-fn'

const MainPage = () => {
    const [responseText, setResponseText] = useState<string>("");
    const [generatedRotaFile, setgeneratedRotaFile] = useState<any>();
    const [predictedData, setPredictedData] = useState<any>();
    const [staffCostPerHour, setStaffCostPerHour] = useState<number>(5);
    const [staffBudgetedHours, setStaffBudgetedHours] = useState<number>(5);

    const [smartPredict, setSmartPredict] = useState<boolean>(false);

    const [testMode, setTestMode] = useState<boolean>(false);

    const [staffDataFile, setStaffDataFile] = useState<any>();
    const [demandFile, setDemandFile] = useState<any>();

    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleSmartPredict = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSmartPredict(event.target.checked);
    };

    const handleErrorSet = (err: string) => {
        setErrorMsg(err)
    }

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <AppLayout content={
            <>
                TestMode
                <Checkbox onChange={(e) => setTestMode(e.target.checked)} />
                <br />

                <b>Upload staff data</b>
                <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/department_1_input.csv"><p><i>Download template</i></p></a>
                <UploadCsvBtn setCurrFile={setStaffDataFile} setStaffCostPerHour={setStaffCostPerHour} setStaffBudgetedHours={setStaffBudgetedHours} isDemand={false} errorSet={handleErrorSet} />

                <Typography>Use smart demand predict<Checkbox onChange={handleSmartPredict} /></Typography>

                {smartPredict ? <></> :
                    <>
                        <br />
                        <b>Upload manual demand</b>
                        <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/manual_demand.csv"><p><i>Download template</i></p></a>
                        <UploadCsvBtn setCurrFile={setDemandFile} setStaffCostPerHour={setStaffCostPerHour} setStaffBudgetedHours={setStaffBudgetedHours} isDemand={true} errorSet={handleErrorSet} />
                        <br />
                    </>
                }


                {errorMsg && <ErrorMessage error={errorMsg} />}


                <Button
                    variant="contained"
                    size='small'
                    disabled={!(staffDataFile && (demandFile || smartPredict))}
                    onClick={() => {
                        testMode ?
                            TestRotaGenerator(setResponseText, setgeneratedRotaFile, setPredictedData) :
                            RotaGenerator(staffDataFile, demandFile, smartPredict, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData, predictedData)
                    }}>
                    Generate optimum rota
                </Button>

                <br />
                <br />

                <br />

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChange} >
                        <Tab label="Schedule" />
                        <Tab label="Predictions" />
                    </Tabs>
                </Box>

                {
                    (generatedRotaFile && !responseText.includes("INFEASIBLE")) ?
                        <RotaSection staffCostPerHour={staffCostPerHour} staffBudgetedHours={staffBudgetedHours} generatedRotaFile={generatedRotaFile} />
                        :
                        responseText === 'Generating..' ?
                            <CircularProgress />
                            :
                            <></>
                }
                <ResponseText text={responseText} />
                {
                    predictedData ?
                        <>
                            <PredictionSection predictedData={predictedData} />
                        </>
                        :
                        null
                }
            </>} />
    )
}

export { MainPage }