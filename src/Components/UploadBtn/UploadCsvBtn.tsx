import React, { ChangeEvent, useState } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from '@mui/material';

import { verifyCSVFormat } from "src/Functions/verify-csv-format";
import { ConvertStaffCSVToJson, ConvertDemandCSVToJson } from "src/Functions/csv-to-json";

type TUploadCSVBtn = {
    setCurrFile: React.Dispatch<React.SetStateAction<any>>,
    setStaffBudgetedHours: React.Dispatch<React.SetStateAction<number>>,
    setDepartmentNo: React.Dispatch<React.SetStateAction<number>>,
    setStaffCostPerHour: React.Dispatch<React.SetStateAction<number>>,
    isDemand: boolean,
    errorSet: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UploadCsvBtn = ({ setCurrFile, setStaffCostPerHour, setStaffBudgetedHours, setDepartmentNo, isDemand, errorSet }: TUploadCSVBtn) => {
    const [filename, setFilename] = useState("");

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || (e.target.files && !e.target.files.length)) {
                setFilename("")
                setCurrFile(null)
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

                if (verifyCSVFormat(result, isDemand)) {
                    errorSet("")
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

                    setCurrFile(convertedCsv)
                } else {
                    errorSet("Invalid csv format. Please check the csv files match the template format")
                }
            };
        } catch (err) {
            errorSet("Error uploading file" + err)
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                component="label"
                size="small"
                startIcon={<UploadFileIcon />}>
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