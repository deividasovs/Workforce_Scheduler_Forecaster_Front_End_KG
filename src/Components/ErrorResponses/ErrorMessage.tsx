import { Alert } from "@mui/material";

const ErrorMessage = ({ error }: { error: string }) => {
    return (
        <Alert severity="error">{error}</Alert>
    );
};


export { ErrorMessage }