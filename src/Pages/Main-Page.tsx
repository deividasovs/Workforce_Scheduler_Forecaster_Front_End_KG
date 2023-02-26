import { useState } from 'react'
import { Container, Button, Typography, Checkbox, Popover, Grid, CircularProgress } from "@mui/material"

import { UploadJsonBtn, UploadCsvBtn } from 'src/Components/UploadBtn'

import { ResponseText } from 'src/Components/ResponseTxt'
import { CreateSchedule, CreateScheduleWithPredictedValues } from 'src/Functions/create-schedule'
import { GetPredictions } from 'src/Functions'

import { PredictionTable } from 'src/Components/PredictionResponse/PredictionValues'

import { ErrorMesssage } from 'src/Components/ErrorResponses/ErrorMessage'

import { generateCSVFileFromString } from 'src/Functions'
import { PredictionGraph } from 'src/Components/PredictionResponse/PredictionGraph'

/* 
TODO:
    - Set a type to the payload we'll be receiving from the backend
    - Clean up
        - Decouple this
    - Raise coverage
*/

const MainPage = () => {
    const [responseText, setResponseText] = useState<string>("");
    const [generatedRotaFile, setgeneratedRotaFile] = useState<any>();
    const [predictedData, setPredictedData] = useState<any>();

    const [smartPredict, setSmartPredict] = useState<boolean>(false);
    const [staffDataFile, setStaffDataFile] = useState<any>();
    const [demandFile, setDemandFile] = useState<any>();

    const [errorMsg, setErrorMsg] = useState<string>("");

    //const [csvFile, setCsvFile] = useState<any>();

    const handleSmartPredict = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSmartPredict(event.target.checked);
    };

    return (
        <Container>
            <br />
            <Typography variant="h4">KG Workforce Forecaster Scheduler </Typography>
            <br />

            <b>Upload staff data</b>
            <a href="#"><p><i>Download template</i></p></a>
            {
                //<UploadJsonBtn setCurrFile={setStaffDataFile} />
            }
            <UploadCsvBtn setCurrFile={setStaffDataFile} isDemand={false} />


            <Typography>Use smart demand predict<Checkbox onChange={handleSmartPredict} /></Typography>

            {smartPredict ? <></> :
                <>
                    <br />
                    <b>Upload manual demand file</b>
                    <a href="#"><p><i>Download template</i></p></a>
                    {
                        //<UploadJsonBtn setCurrFile={setDemandFile} />
                    }
                    <UploadCsvBtn setCurrFile={setDemandFile} isDemand={true} />
                    <br />
                </>
            }

            <br />
            {errorMsg && <ErrorMesssage error={errorMsg} />}
            <br />



            <Button variant="contained" onClick={() => {
                setResponseText("Generating..")

                //// TODO: Clean this up big time!

                if (smartPredict) {
                    console.log("Predicting...")

                    GetPredictions()
                        .then(response => response.text())
                        .then(response => JSON.parse(response))
                        .then(data => {
                            setPredictedData(data)

                            CreateScheduleWithPredictedValues(staffDataFile, data)
                                .then(response => response.text())
                                .then(response => JSON.parse(response))
                                .then(data => {
                                    setResponseText(data.stats)
                                    console.log(data.schedule)
                                    setgeneratedRotaFile(data.schedule)
                                }
                                ).catch(err => setResponseText(err.toString()))
                        })
                        .catch(err => {
                            setErrorMsg(err)
                            console.log(err)
                        })

                } else {
                    console.log("Generating...")
                    try {
                        staffDataFile['WeeklyCoverDemand'] = demandFile['WeeklyCoverDemand']
                        console.log(staffDataFile)
                        CreateSchedule(staffDataFile)
                            .then(response => response.text())
                            //.then(response => response.replaceAll('\'', "\""))
                            .then(response => JSON.parse(response))
                            .then(data => {
                                setResponseText(data.stats)
                                console.log(data.schedule)
                                setgeneratedRotaFile(data.schedule)
                            }
                            ).catch(err => setResponseText(err.toString()))
                    } catch (err) {
                        setErrorMsg(err as string)
                        console.log(err)
                    }
                }
            }}>
                Generate
            </Button>

            <br />
            <br />
            <hr />
            <Typography variant="h5">Response</Typography>

            <br />
            {
                generatedRotaFile ?
                    <Button variant="contained" color='success' onClick={() => generateCSVFileFromString(generatedRotaFile, "FILENAME.csv",)}>
                        Download Staff Rota
                    </Button>
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