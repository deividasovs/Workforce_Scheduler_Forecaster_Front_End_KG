import { Typography } from "@mui/material";

const ErrorMesssage = ({ error }: { error: string }) => {
    return (
        <Typography variant="h5" color="error">
            {error}
        </Typography>
    );
};


export { ErrorMesssage }