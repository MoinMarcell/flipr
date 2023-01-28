import {Flipr} from "../model/Flipr";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useCallback} from "react";

type FliprCardProps = {
    flipr: Flipr,
    username: string,
    deleteFlipr(fliprId: string): Promise<string>,
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
export default function FliprCard(props: FliprCardProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenMoreMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleCloseMoreMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleDeleteClick = useCallback(() => {
        props.deleteFlipr(props.flipr.id)
            .then();
    }, [props]);

    const isAuthenticated: boolean = props.username !== 'anonymousUser' && props.username !== undefined && props.username !== null && props.username === props.flipr.author;

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid component={"article"} item>
                <Card sx={{maxWidth: 345, m: 2, height: '100%'}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                A
                            </Avatar>
                        }
                        action={
                            isAuthenticated ?
                                <Box>
                                    <IconButton aria-label="settings" onClick={handleOpenMoreMenu}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseMoreMenu}
                                    >
                                        <MenuItem onClick={handleDeleteClick}>Delete this Flipr</MenuItem>
                                    </Menu>
                                </Box> :
                                ''
                        }
                        title={props.flipr.author}
                        subheader={props.flipr.dateTime.toString()}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            {props.flipr.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </ThemeProvider>
    );

}
