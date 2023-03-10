import { ChangeEvent, useState } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from '@mui/material';

import { ConvertStaffCSVToJson, ConvertDemandCSVToJson } from "src/Functions/csv-to-json";


const UploadCsvBtn = ({ setCurrFile, setStaffCostPerHour, setStaffBudgetedHours, isDemand, errorSet }: { setCurrFile: any, setStaffBudgetedHours: any, setStaffCostPerHour: any, isDemand: boolean, errorSet: any }) => {
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


                let convertedCsv: any = null

                if (isDemand) {
                    convertedCsv = ConvertDemandCSVToJson(result as string)
                } else {
                    const convertedCsvValues = ConvertStaffCSVToJson(result as string)

                    convertedCsv = convertedCsvValues.convertedCsv
                    const { costPerHour, budgetedHours } = convertedCsv
                    setStaffCostPerHour(costPerHour)
                    setStaffBudgetedHours(budgetedHours)
                }

                console.log("-----CSV converted to Json-----")
                console.log(convertedCsv)

                /*
                /// Check if the json is empty
                if (convertedToJSON.length === 0) {
                    console.log("Invalid format!")
                    errorSet("Invalid format!")
                    return
                }*/


                setCurrFile(convertedCsv)
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