import { useState } from 'react'
import { Container, Button, Typography, Checkbox, CircularProgress } from "@mui/material"

import { HeaderBar } from 'src/Components/HeaderBar/HeaderBar'
import { UploadCsvBtn } from 'src/Components/UploadBtn'
import { ResponseText } from 'src/Components/ResponseTxt'
import { PredictionTable } from 'src/Components/PredictionResponse/PredictionValues'
import { ErrorMessage } from 'src/Components/ErrorResponses/ErrorMessage'
import { PredictionGraph } from 'src/Components/PredictionResponse/PredictionGraph'
import { RotaViewer } from 'src/Components/RotaViewer'

import { RotaGenerator } from 'src/Functions/rota-generator'
import { generateCSVFileFromString } from 'src/Functions'

const MainPage = () => {
    const [responseText, setResponseText] = useState<string>("");
    const [generatedRotaFile, setgeneratedRotaFile] = useState<any>();
    const [predictedData, setPredictedData] = useState<any>();
    const [staffCostPerHour, setStafCostPerHour] = useState<number>(5);
    const [staffBudgetedHours, setStaffBudgetedHours] = useState<number>(5);

    const [smartPredict, setSmartPredict] = useState<boolean>(false);

    const [staffDataFile, setStaffDataFile] = useState<any>();
    const [demandFile, setDemandFile] = useState<any>();

    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleSmartPredict = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSmartPredict(event.target.checked);
    };

    const handleErrorSet = (err: string) => {
        setErrorMsg(err)
    }

    return (
        <Container>
            <br />
            <HeaderBar />
            <br />

            <b>Upload staff data</b>
            <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/department_1_input.csv"><p><i>Download template</i></p></a>
            <UploadCsvBtn setCurrFile={setStaffDataFile} isDemand={false} errorSet={handleErrorSet} />

            <Typography>Use smart demand predict<Checkbox onChange={handleSmartPredict} /></Typography>

            {smartPredict ? <></> :
                <>
                    <br />
                    <b>Upload manual demand</b>
                    <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/manual_demand.csv"><p><i>Download template</i></p></a>
                    <UploadCsvBtn setCurrFile={setDemandFile} isDemand={true} errorSet={handleErrorSet} />
                    <br />
                </>
            }

            <br />
            {errorMsg && <ErrorMessage error={errorMsg} />}
            <br />

            <Button
                variant="contained"
                size='small'
                onClick={() => {
                    setResponseText("Generating..")
                    RotaGenerator(staffDataFile, demandFile, smartPredict, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData)
                }}>
                Generate
            </Button>

            <br />
            <br />
            <hr />
            <Typography variant="h6">Response</Typography>

            <br />
            {
                (generatedRotaFile && !responseText.includes("INFEASIBLE")) ?
                    <>
                        <RotaViewer staffCostPerHour={staffCostPerHour} hourBudget={staffBudgetedHours} rotaFile={generatedRotaFile} />

                        <Button variant="contained" color='success' onClick={() => generateCSVFileFromString(generatedRotaFile, "Rota.csv",)}>
                            Download Rota CSV
                        </Button>
                    </>
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
                        <PredictionTable data={predictedData} />
                        <PredictionGraph predictedData={predictedData} />
                    </>
                    :
                    null
            }
        </Container >
    )
}

export { MainPage }