import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import WordCard from './WordCard';
import 'fontsource-roboto';
import CardIcons from './CardIcons';
import { backRoutes } from '../utils/backRoutes';
import { regexpForText } from '../utils/initConsts';
import { makeStyles } from '@material-ui/core/styles';
import WordInfo from './WordInfo';
import Answers from './Answers';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	list: {
		display: 'Flex',
		justifyContent: 'center',
		flexDirection: 'column',
		marginBottom: '40px',
		marginTop: '40px'
	},
	loader: {
		position: 'relative',
		margin: '40px',
		alignSelf: 'center',
		justifySelf: 'center'
	}
}));

export default function WordsCardList({
	userWords,
	difficulty,
	fetchUrl,
	infoPanel,
	wrong,
	correct,
	curentUserWords,
	activeWordButton,
	token,
	userId
}) {
	const [ wordsArr, setWordsArr ] = useState([]);
	const { request } = useHttp();
	const classes = useStyles();

	const fetchWords = useCallback(
		async () => {
			const deleteUserWords = [];
			if (curentUserWords) {
				const data = await request(fetchUrl, 'GET');
				curentUserWords.forEach((item) => {
					if (item.optional.deleted) {
						deleteUserWords.push(item.wordId);
					}
				});
				const filteredArr = data.filter((item) => !deleteUserWords.includes(item.id));
				setWordsArr(filteredArr);
			} else {
				const data = await request(fetchUrl, 'GET');
				setWordsArr(data);
			}
		},
		[ curentUserWords, fetchUrl, request ]
	);

	const fetchUserWords = useCallback(
		async () => {
			const cards = await Promise.all(
				userWords.map(async (item) => {
					const result = await request(backRoutes.getWord(item.wordId), 'GET');
					result.correct = item.optional.correct ? item.optional.correct : 123;
					result.wrong = item.optional.wrong ? item.optional.wrong : 10;
					return result;
				})
			);
			setWordsArr(cards);
		},
		[ userWords, request ]
	);

	useEffect(
		() => {
			if (userWords) {
				fetchUserWords();
			} else {
				fetchWords();
			}
		},
		[ curentUserWords, fetchUserWords, fetchWords, userWords ]
	);

	return (
		<ul className={classes.list}>
			{wordsArr.length ? (
				wordsArr.map((item) => (
					<WordCard
						key={item.id}
						word={item.word}
						image={item.image}
						textExample={item.textExample.replace(regexpForText, '')}
						textExampleTranslate={item.textExampleTranslate}
						transcription={item.transcription}
						wordTranslate={item.wordTranslate}
						textMeaning={item.textMeaning.replace(regexpForText, '')}
						textMeaningTranslate={item.textMeaningTranslate}
						infoPanel={
							infoPanel === 'CardIcons' ? (
								<CardIcons
									userWords={curentUserWords ? curentUserWords : []}
									difficulty={difficulty}
									wordId={item.id}
									audioWord={item.audio}
									audioExample={item.audioExample}
									audioMeaning={item.audioMeaning}
								/>
							) : infoPanel === 'WordInfo' ? (
								<WordInfo
									difficulty={difficulty}
									wordId={item.id}
									userId={userId}
									group={item.group}
									activeWordButton={activeWordButton}
									token={token}
								/>
							) : infoPanel === 'Answers' ? (
								<Answers wrong={item.wrong} correct={item.correct} wordId={item.id} userId={userId} token={token} />
							) : null
						}
					/>
				))
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</ul>
	);
}
