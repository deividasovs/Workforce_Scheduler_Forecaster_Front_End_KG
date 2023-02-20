import { ChangeEvent, useState } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from '@mui/material';


const UploadJsonBtn = ({ setCurrFile }: { setCurrFile: any }) => {
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

            const res = JSON.parse(result as string)

            console.log("----Input received----");

            setCurrFile(res)

        };

        reader.readAsBinaryString(file);
    };

    return (
        <>
            <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
            >
                Upload json
                <input
                    type="file"
                    hidden
                    accept='.json'
                    onChange={handleFileUpload}
                />
            </Button>
            {filename && <span>{filename}</span>}
        </>
    )
};

export { UploadJsonBtn }