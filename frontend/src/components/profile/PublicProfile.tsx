import {useParams} from "react-router";
import useUser from "../hooks/useUser";
import React, {useCallback} from "react";
import {Box, Button, Grid, Tabs, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PublicProfile() {

    const params = useParams();
    const username: string | undefined = params.username;

    const {user} = useUser(username);

    const [value, setValue] = React.useState(0);

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    return(
        <Grid container spacing={1} flexDirection={"column"} sx={{mt: 4}}>
            <Grid item alignSelf={"center"}>
                <AccountCircle sx={{fontSize: 70}} />
            </Grid>
            <Grid item alignSelf={"center"}>
                <Typography variant={"h4"}>@{user.username}</Typography>
            </Grid>
            <Grid item alignSelf={"center"}>
                <Button variant={"outlined"}>Follow me</Button>
            </Grid>
            <Grid item alignSelf={"center"}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Fliprs" {...a11yProps(0)} />
                        <Tab label="Liked Fliprs" {...a11yProps(1)} />
                        <Tab label="Followers" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Grid>
        </Grid>
    );
}