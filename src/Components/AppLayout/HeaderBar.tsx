import { useState } from "react";

import { Typography, AppBar, Box, Container, Toolbar, IconButton, Checkbox } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import { Drawer } from "./Drawer";

const HeaderBar = ({ title = "KG Workforce Forecaster Scheduler" }: { title?: string }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [testMode, setTestMode] = useState<boolean>(false);

    /// TODO: Add React Context here to pass testMode to all components


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Drawer isOpen={isOpen} />
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                Dev mode
                <Checkbox color="default" onChange={(e) => setTestMode(e.target.checked)} />
            </Toolbar>
        </AppBar>
    )
}

export { HeaderBar }