import React, { useContext, useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { originURL } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import GradeIcon from "@material-ui/icons/Grade";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Howl, Howler } from "howler";
// import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
// import { INIT_CONSTS } from '../utils/initConsts';
import { AuthContext } from "../context/AuthContext";
import { backRoutes } from "../utils/backRoutes";
// import { useHttp } from "../hooks/http.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  boxIcons: {
    paddingLeft: "40px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    fontSize: "34px",
  },
  icons: {
    marginRight: "10px",
    fontSize: "34px",
    color: "#000000",
    cursor: "pointer",
  },
  iconActive: {
    color: "#FFD700",
  },
}));

export default function CardIcons({
  userWords,
  wordId,
  audioWord,
  audioMeaning,
  audioExample,
  difficulty,
  page,
  clickDelete,
}) {
  const classes = useStyles();
  const { userId, token } = useContext(AuthContext);
  const [allUserWords, setAllUserWords]=useState(userWords)
  // console.log(allUserWords,token)
  const audio = new Howl({
    src: [`${originURL}/${audioWord}`],
    // volume: 0.001 * volume
    onend: function () {
      new Howl({
        src: [`${originURL}/${audioMeaning}`],
        onend: function () {
          new Howl({
            src: [`${originURL}/${audioExample}`],
          }).play();
        },
      }).play();
    },
  });
  const playWordsAudio = () => {
    Howler.stop();
    audio.play();
  };
  const func = useCallback(async () => {
    const result = await backRoutes.getUserWords({ userId, token });
    if (result) {
      setAllUserWords(result);
    }
  }, [token, userId]);

  const addWordToDictionary = async () => {
    if (
      allUserWords.length===0 ||
      !allUserWords.find((item) => wordId === item.wordId)
    ) {
      await backRoutes.createUserWord({
        userId: userId,
        wordId: wordId,
        word: {
          difficulty: "difficult",
          optional: { group: difficulty, page: page, deleted: false },
        },
        token: token,
      });
    } else if (
      allUserWords &&
      allUserWords.find(
        (item) => wordId === item.wordId && item.difficulty === "difficult"
      )
    ) {
      await backRoutes.updateUserWord({
        userId: userId,
        wordId: wordId,
        word: {
          difficulty: "weak",
          optional: { group: difficulty, page: page, deleted: false },
        },
        token: token,
      });
    } else if (
      allUserWords &&
      allUserWords.find(
        (item) => wordId === item.wordId && item.difficulty !== "difficult"
      )
    ) {
      await backRoutes.updateUserWord({
        userId: userId,
        wordId: wordId,
        word: {
          difficulty: "difficult",
          optional: { group: difficulty, page: page, deleted: false },
        },
        token: token,
      });
      console.log("word is in your dictionary");
    }
    func()
  };

  // const addWordToDictionaryDelete = async () => {
  //   if (
  //     allUserWords &&
  //     !allUserWords.find((item) => wordId === item.wordId)
  //   ) {
  //     await backRoutes.createUserWord({
  //       userId: userId,
  //       wordId: wordId,
  //       word: {
  //         difficulty: "weak",
  //         optional: { group: difficulty, page: page, deleted: true },
  //       },
  //       token: token,
  //     });
  //   } else {
  //     await backRoutes.updateUserWord({
  //       userId: userId,
  //       wordId: wordId,
  //       word: {
  //         difficulty: "weak",
  //         optional: { group: difficulty, page: page, deleted: true },
  //       },
  //       token: token,
  //     });
  //     console.log("word is in your dictionary");
  //   }
  // };

  // useEffect(() => {
  //   if (userId && token) {
  //     func();
  //   }
  // }, [func, token, userId]);

  return (
    <Box className={classes.boxIcons}>
      <PlayCircleFilledIcon
        onClick={playWordsAudio}
        className={classes.icons}
      ></PlayCircleFilledIcon>
      <GradeIcon
        className={
          allUserWords.length>0
            ? allUserWords.filter(
                (item) =>
                  wordId === item.wordId && item.difficulty === "difficult"
              ).length
              ? `${classes.icons} ${classes.iconActive}`
              : `${classes.icons}`
            : `${classes.icons}`
        }
        onClick={addWordToDictionary}
      ></GradeIcon>
      <DeleteIcon
        className={classes.icons}
        onClick={clickDelete}
      ></DeleteIcon>
    </Box>
  );
}
