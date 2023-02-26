import { Typography } from "@mui/material";

const ErrorMesssage = ({ error }: { error: string }) => {
    return (
        <Typography color="error">
            {error}
        </Typography>
    );
};


export { ErrorMesssage }