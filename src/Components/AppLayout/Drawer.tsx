import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import CreateIcon from '@mui/icons-material/Create'
import TimelineIcon from '@mui/icons-material/Timeline'
import HistoryIcon from '@mui/icons-material/History'

import { LANDING_PAGE_EP, GENERATE_ROTA_PAGE_EP, PREDICTIONS_PAGE_EP, HISTORICAL_ROTAS_EP } from 'src/consts';

const Drawer = ({ isOpen }: { isOpen: boolean }) => (
    <SwipeableDrawer
        anchor='left'
        open={isOpen}
        onClose={() => { }}
        onOpen={() => { }}
    >
        <List>
            <ListItem button component={Link} href={LANDING_PAGE_EP}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} href={GENERATE_ROTA_PAGE_EP}>
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Generate Rota" />
            </ListItem>
            <ListItem button component={Link} href={PREDICTIONS_PAGE_EP}>
                <ListItemIcon>
                    <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Predictions" />
            </ListItem>
            <ListItem button component={Link} href={HISTORICAL_ROTAS_EP}>
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Historical Rotas" />
            </ListItem>
        </List>
    </SwipeableDrawer>
)

export { Drawer }