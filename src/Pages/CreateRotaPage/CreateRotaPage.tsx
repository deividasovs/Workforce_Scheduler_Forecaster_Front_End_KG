import { useState } from 'react'
import { Button, Typography, Checkbox, CircularProgress } from "@mui/material"

import { AppLayout } from 'src/Components/AppLayout'
import { UploadCsvBtn } from 'src/Components/UploadBtn'
import { ErrorMessage } from 'src/Components/ErrorResponses/ErrorMessage'
import { RotaSection } from 'src/Components/RotaViewer'

import { GenerateRota } from 'src/Functions/generate-rota'
import { GENERATE_ROTA_PAGE_NAME } from 'src/consts'

const CreateRotaPage = () => {
    const [generatedRotaFile, setgeneratedRotaFile] = useState<any>();
    const [staffCostPerHour, setStaffCostPerHour] = useState<number>(5);
    const [staffBudgetedHours, setStaffBudgetedHours] = useState<number>(5);
    const [smartPredict, setSmartPredict] = useState<boolean>(false);
    const [staffFile, setStaffDataFile] = useState<any>();
    const [demandFile, setDemandFile] = useState<any>();
    const [departmentNo, setDepartmentNo] = useState<number>(1);
    const [visualDepartmentNo, setVisualDepartmentNo] = useState<number>();
    const [responseText, setResponseText] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string | undefined>("");

    const handleSmartPredict = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSmartPredict(event.target.checked);
        setDemandFile(null)
    };

    const resetStates = () => {
        setResponseText("")
        setgeneratedRotaFile(null)
        setVisualDepartmentNo(undefined)
        setErrorMsg("")
    }

    const handleGenerateRotaClick = async () => {
        resetStates()

        setResponseText("Generating..")

        setVisualDepartmentNo(departmentNo)
        const { errorMsg, responseText, generatedRotaFile } = await GenerateRota({ staffDataFile: staffFile, departmentNo, demandFile, smartPredict })

        setErrorMsg(errorMsg)
        setResponseText(responseText)
        setgeneratedRotaFile(generatedRotaFile)
    }

    return (
        <AppLayout
            title={GENERATE_ROTA_PAGE_NAME}
            content={
                <>
                    <b>Staff data</b>
                    <a href="https://kg-datasets-012.s3.eu-west-1.amazonaws.com/cost_department_1_input.csv"><p><i>Download template</i></p></a>
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
                    <br />
                    <Button
                        variant="contained"
                        size='small'
                        disabled={!(staffFile && (demandFile || smartPredict) && errorMsg === "")}
                        onClick={() => handleGenerateRotaClick()}>
                        Generate optimum rota
                    </Button>

                    <br />
                    <br />

                    {errorMsg && errorMsg !== "" && <ErrorMessage error={errorMsg} />}
                    <hr />

                    {generatedRotaFile && !responseText.includes("INFEASIBLE") &&
                        <>
                            <Typography variant='h5'>[Department {visualDepartmentNo}] Next week's rota </Typography>
                            <RotaSection staffCostPerHour={staffCostPerHour} staffBudgetedHours={staffBudgetedHours} generatedRotaFile={generatedRotaFile} />
                        </>
                    }

                    {responseText === 'Generating..' &&
                        <CircularProgress />
                    }

                    {generatedRotaFile && responseText.includes("INFEASIBLE") &&
                        <Typography variant='h6'>Infeasible rota given demand</Typography>
                    }

                    {!generatedRotaFile && !responseText.includes("INFEASIBLE") && responseText !== 'Generating..' &&
                        <></>
                    }



                </>
            }
        />
    )
}

export { CreateRotaPage }