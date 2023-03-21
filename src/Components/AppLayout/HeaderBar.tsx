import { useState } from "react";

import { Typography, AppBar, Toolbar, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import { Drawer } from "./Drawer";

const HeaderBar = ({ title = "KG Workforce Forecaster Scheduler" }: { title?: string }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => setIsOpen(!isOpen)}>
                    <Drawer isOpen={isOpen} />
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

            </Toolbar>
        </AppBar>
    )
}

export { HeaderBar }