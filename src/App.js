import './App.css';
import Components from '../src/ComponentsList';
import Typography from '@material-ui/core/Typography';
import { looks_one } from '@material-ui/icons';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import Star from '@material-ui/icons/Grade';
import Play from '@material-ui/icons/PlayCircleFilled';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Typography variant="h1" component="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" component="h2" gnpm startutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="body1" gutterBottom>
        h1. Heading
      </Typography>
      <div>
        <LooksOneIcon />
        <Star />
        <Play />
      </div>

      <TextField
        required
        id="outlined-required"
        label="Имя пользвоателя"
        defaultValue="fedor"
        variant="outlined"
      />

      <div className={classes.root}>
        <Paper elevation={0} />
        <Paper />
        <Paper elevation={3} />
      </div>
      <Switch color="primary" />
      <Button variant="contained">Default</Button>
      <Slider
      // value={value}
      // onChange={handleChange}
      // aria-labelledby="continuous-slider"
      />
      <AppBar position="static">
        <Tabs>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <Pagination count={10} variant="outlined" />
    </div>
  );
}

export default App;
