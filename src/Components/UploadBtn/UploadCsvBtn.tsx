import { ChangeEvent, useState } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from '@mui/material';

import { ConvertStaffCSVToJson, ConvertDemandCSVToJson } from "src/Functions/csv-to-json";


const UploadCsvBtn = ({ setCurrFile, isDemand }: { setCurrFile: any, isDemand: boolean }) => {
    const [filename, setFilename] = useState("");

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;

        setFilename(name);

        const reader = new FileReader();

        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return;
            }
            const { result } = evt.target;

            //const res = JSON.parse(result as string)

            console.log("----Input received----");
            console.log(result)


            const convertedToJSON = isDemand ? ConvertDemandCSVToJson(result as string) : ConvertStaffCSVToJson(result as string)
            //const convertedToJSON = ConvertStaffCSVToJson(result as string)

            console.log("-----CSV converted to Json-----")
            console.log(convertedToJSON)

            setCurrFile(convertedToJSON)
        };

        reader.readAsBinaryString(file);
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