import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Flipr} from "../Model/Flipr";
import MyFliprs from "./MyFliprs";
import {useCallback} from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type ProfileAppProps = {
    username: string,
    fliprs: Flipr[],
    handleDelete: (id: string | undefined) => void,
    saveFlipr: (content: string, username: string) => void,
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

function tabProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileApp(props: ProfileAppProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, [setValue]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <h2>Welcome back @{props.username}</h2>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Fliprs" {...tabProps(0)} />
                    <Tab label="My liked Fliprs" {...tabProps(1)} />
                    <Tab label="Edit my Profile" {...tabProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <MyFliprs username={props.username} saveFlipr={props.saveFlipr} fliprs={props.fliprs} handleDelete={props.handleDelete} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h1>Comming soon</h1>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h1>Comming soon</h1>
            </TabPanel>
        </Box>
    );
}