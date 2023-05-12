import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';

import { withStyles } from '@mui/material';
import LandingPage from './LandingPage';
import OurDocs from './OurDocs';
import styles from "./LandingPage.module.scss";


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
          {children}
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

export default function Main() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs" centered>
          <Tab className={styles.button} label="Poetic AI" {...a11yProps(0)} />
          <Tab className={styles.button} label="Chat With Our Docs" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

       <LandingPage/>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <OurDocs/>
      </TabPanel>

    </Box>

  );
}
