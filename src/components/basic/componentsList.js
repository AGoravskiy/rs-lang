import './App.css';
import Typography from '@material-ui/core/Typography';
import { looks_one } from '@material-ui/icons';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import LooksOneIcon from '@material-ui/icons/LooksOne';
// import SoundIcon from '@material-ui/icons/2Sound';

function Components() {
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
      import LooksOneIcon from '@material-ui/icons/LooksOne';
      <LooksOneIcon />
      {/* <SoundIcon /> */}
    </div>
  );
}

export default Components;
