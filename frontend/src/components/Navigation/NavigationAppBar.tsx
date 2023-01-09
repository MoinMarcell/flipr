import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {AppBar} from "./NavigationGlobalSettings"
import NavigationSearchInput from "./NavigationSearchInput";

type NavigationAppBarProps = {
    open: boolean,
    handleDrawerOpen: () => void,
}

export default function NavigationAppBar(props: NavigationAppBarProps) {
    return (
        <AppBar position="fixed" open={props.open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(props.open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    FLIPR
                </Typography>
                <BubbleChartIcon fontSize={'medium'} sx={{mr: 5}} />
                <NavigationSearchInput />
            </Toolbar>
        </AppBar>
    );
}