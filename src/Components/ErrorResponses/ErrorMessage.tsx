import { Typography } from "@mui/material";

const ErrorMessage = ({ error }: { error: string }) => {
    return (
        <Typography color="error">
            {error}
        </Typography>
    );
};


export { ErrorMessage }