import { ChangeEvent, useState } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from '@mui/material';

import { verifyCSVLayout } from "src/Functions/verify-csv-format";
import { ConvertStaffCSVToJson, ConvertDemandCSVToJson } from "src/Functions/csv-to-json";

const UploadCsvBtn = ({ setCurrFile, setStaffCostPerHour, setStaffBudgetedHours, setDepartmentNo, isDemand, errorSet }: { setCurrFile: any, setStaffBudgetedHours: any, setDepartmentNo: any, setStaffCostPerHour: any, isDemand: boolean, errorSet: any }) => {
    const [filename, setFilename] = useState("");

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) {
                return;
            }
            const file = e.target.files[0];
            const { name } = file;

            setFilename(name);

            const reader = new FileReader();

            reader.readAsBinaryString(file);

            reader.onload = (evt) => {
                if (!evt?.target?.result) {
                    return;
                }
                const { result } = evt.target;


                console.log("----Input received----");
                console.log(result)

                if (verifyCSVLayout(result, isDemand)) {
                    let convertedCsv: any = null

                    if (isDemand) {
                        convertedCsv = ConvertDemandCSVToJson(result as string)
                    } else {
                        const convertedCsvValues = ConvertStaffCSVToJson(result as string)

                        convertedCsv = convertedCsvValues.convertedCsv
                        setStaffCostPerHour(convertedCsvValues.costPerHour)
                        setStaffBudgetedHours(convertedCsvValues.budgetedHours)
                        setDepartmentNo(convertedCsvValues.department)
                    }

                    console.log("-----CSV converted to Json-----")
                    console.log(convertedCsv)

                    setCurrFile(convertedCsv)
                } else {
                    errorSet("Invalid csv format. Please check the csv files match the template format")
                }
            };
        } catch (err) {
            errorSet(err)
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                component="label"
                size="small"
                startIcon={<UploadFileIcon />}
            >
                Upload csv
                <input
                    type="file"
                    hidden
                    accept='.csv'
                    onChange={handleFileUpload}
                />
            </Button>
            <br />
            {filename && <span>{filename}</span>}
        </>
    )
};

export { UploadCsvBtn }