import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { backRoutes } from "../utils/backRoutes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  box: {
    paddingLeft:'0px',
    display:'flex',
    flexWrap:'wrap',
    justifyContent: 'left',
    fontSize: '34px',
    gap:'20px',
    marginBottom:'10px',
  },
  title: {
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "100%",
    textAlign: "left",
    color: '#000000',
    verticalAlign: "middle",
    alignSelf: 'center',
  },
  button: {
    height: '36px',
    width: '180px',
    borderRadius: '4px',
    backgroundColor:'#01a299',
    color:'#ffffff'
  },
  correct:{
    color:'green'
  },
  wrong:{
    color:'red'
  }
}))

export default function Answers({wrong,correct,token,userId,wordId,difficulty,page}) {
  const classes = useStyles();
  const handleButtonClick = () =>{
    backRoutes.updateUserWord({
      userId: userId,
      wordId: wordId,
      word: { difficulty: 'weak', optional: { group: difficulty, page: page, deleted: true } },
      token: token
    });
    console.log('сдово перемещено в удаленные')
    
  }
  return (
    <Box className={classes.box}>
      <Typography className={classes.title} variant="h1" component="h4">
        Правильные ответы: <span className={classes.correct}>{correct? correct : 0}</span>
      </Typography>
      <Typography className={classes.title} variant="h1" component="h4">
        Ошибки: <span className={classes.wrong}>{wrong? wrong : 0}</span>
      </Typography>
      <Button variant="contained" className={classes.button} onClick={handleButtonClick}>
        Удалить из словаря
      </Button>

    </Box>
  );
}
