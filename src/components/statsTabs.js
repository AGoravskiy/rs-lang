import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../components/table';
import { Chart } from '../components/chart';
import { totalWordsCount } from '../utils/totalWords';
import { data } from '../const/everyDayChart';

const totalWords = totalWordsCount(data);
export function TabPanel(props) {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  title: {
    marginTop: '40px',
    marginBottom: '20px',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="В цифрах" {...a11yProps(0)} />
          <Tab label="На графиках" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography variant="h4" className={classes.title}>
          Всего
        </Typography>
        <Table />
        <Typography variant="h4" className={classes.title}>
          Самая длинная серия
        </Typography>
        <Table />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h4" className={classes.title}>
          Прогресс изучения слов по дням
        </Typography>
        <Chart data={data} />
        <Typography variant="h4" className={classes.title}>
          Сколько всего слов вы выучили
        </Typography>
        <Chart data={totalWords} />
      </TabPanel>
    </div>
  );
}
