import { ChangeEvent, useState } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from '@mui/material';

import { ConvertStaffCSVToJson, ConvertDemandCSVToJson } from "src/Functions/csv-to-json";


const UploadCsvBtn = ({ setCurrFile, isDemand, errorSet }: { setCurrFile: any, isDemand: boolean, errorSet: any }) => {
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


                const convertedToJSON = isDemand ? ConvertDemandCSVToJson(result as string) : ConvertStaffCSVToJson(result as string)

                console.log("-----CSV converted to Json-----")
                console.log(convertedToJSON)

                /*
                /// Check if the json is empty
                if (convertedToJSON.length === 0) {
                    console.log("Invalid format!")
                    errorSet("Invalid format!")
                    return
                }*/


                setCurrFile(convertedToJSON)
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