import { useState } from 'react'
import { Button, Typography, Checkbox, CircularProgress } from "@mui/material"

import { AppLayout } from 'src/Components/AppLayout'
import { UploadCsvBtn } from 'src/Components/UploadBtn'
import { ErrorMessage } from 'src/Components/ErrorResponses/ErrorMessage'
import { RotaSection } from 'src/Components/RotaViewer'

import { RotaGenerator } from 'src/Functions/rota-generator'
import { GENERATE_ROTA_PAGE_NAME } from 'src/consts'

const CreateRotaPage = () => {
    const [responseText, setResponseText] = useState<string>("");
    const [generatedRotaFile, setgeneratedRotaFile] = useState<any>();
    const [predictedData, setPredictedData] = useState<any>();
    const [staffCostPerHour, setStaffCostPerHour] = useState<number>(5);
    const [staffBudgetedHours, setStaffBudgetedHours] = useState<number>(5);

    const [smartPredict, setSmartPredict] = useState<boolean>(false);

    const [staffFile, setStaffDataFile] = useState<any>();
    const [demandFile, setDemandFile] = useState<any>();
    const [departmentNo, setDepartmentNo] = useState<any>();

    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleSmartPredict = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSmartPredict(event.target.checked);
        setDemandFile(null)
    };

    return (
        <AppLayout
            title={GENERATE_ROTA_PAGE_NAME}
            content={
                <>
                    <b>Staff data</b>
                    <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/cost_department_1_input+.csv"><p><i>Download template</i></p></a>
                    <UploadCsvBtn setCurrFile={setStaffDataFile} setDepartmentNo={setDepartmentNo} setStaffCostPerHour={setStaffCostPerHour} setStaffBudgetedHours={setStaffBudgetedHours} isDemand={false} errorSet={setErrorMsg} />

                    <Typography>Use smart demand predict<Checkbox onChange={handleSmartPredict} /></Typography>

                    {smartPredict ? <></> :
                        <>
                            <br />
                            <b>Manual demand</b>
                            <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/manual_demand_dept_1.csv"><p><i>Download template</i></p></a>
                            <UploadCsvBtn setCurrFile={setDemandFile} setDepartmentNo={setDepartmentNo} setStaffCostPerHour={setStaffCostPerHour} setStaffBudgetedHours={setStaffBudgetedHours} isDemand={true} errorSet={setErrorMsg} />
                            <br />
                        </>
                    }

                    <Button
                        variant="contained"
                        size='small'
                        disabled={!(staffFile && (demandFile || smartPredict) && errorMsg === "")}
                        onClick={() => {
                            RotaGenerator(
                                {
                                    staffDataFile: staffFile, departmentNo, demandFile, smartPredict,
                                    setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData, predictedData
                                }
                            )
                        }}>
                        Generate optimum rota
                    </Button>

                    <br />
                    <br />

                    {errorMsg !== "" && <ErrorMessage error={errorMsg} />}

                    <hr />

                    {
                        (generatedRotaFile && !responseText.includes("INFEASIBLE")) ?
                            <>
                                <Typography variant='h5'>[Department {departmentNo}] Next week's rota </Typography>
                                <RotaSection staffCostPerHour={staffCostPerHour} staffBudgetedHours={staffBudgetedHours} generatedRotaFile={generatedRotaFile} />
                            </>
                            :
                            responseText === 'Generating..' ?
                                <CircularProgress />
                                :
                                <></>
                    }
                </>} />
    )
}

export { CreateRotaPage }