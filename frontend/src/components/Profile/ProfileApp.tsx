import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Flipr} from "../Model/Flipr";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type ProfileAppProps = {
    username: string,
    fliprs: Flipr[],
    handleDelete: (id: string) => void,
    saveFlipr: (content: string, username: string) => void,
    updateUser: (actualUser: string, username: string, password: string) => void,
}

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

export default function ProfileApp(props: ProfileAppProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Typography variant={"h5"} align={"center"}>Welcome back @{props.username}</Typography>
            <Divider sx={{mt: 1}} variant={'fullWidth'} />
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
        </Box>
    );
}