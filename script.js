'use strict'

const RPS = ['rock', 'paper', 'scissors']
const numRounds = 3
const scores = [0, 0, 0] // [tie, user, computer]
let curRound = 0

const roundElt = document.querySelector('.round .round-number')
const userScoreElt = document.querySelector('.user-score .score-value')
const ComputerScoreElt = document.querySelector('.computer-score .score-value')
const choiceBtns = document.querySelectorAll('.choice-btn')
const logElt = document.querySelector('.log')
const resultElt = document.querySelector('.result')

/**
 * returns 0 or 1 or 2:
 * 0 if tie
 * 1 if choiceA is the winner
 * 2 if choiceB is the winner
 */
const getRoundResult = function (choiceA, choiceB) {
	const idxA = RPS.indexOf(choiceA.toLowerCase())
	const idxB = RPS.indexOf(choiceB.toLowerCase())

	// [Rock, Paper, Scissor] each choice win vs. the previous choice,
	// fail vs. the next choice, tie with anything else
	// so determine the result depending on the 'distance' between the two choices
	return (idxA - idxB + RPS.length) % RPS.length
}

const getRoundMsg = function (choiceA, choiceB, roundResult) {
	switch (roundResult) {
		case 0:
			return `Tie! ${choiceA} tie with ${choiceB}`
		case 1:
			return `You Win! ${choiceA} beats ${choiceB}`
		case 2:
			return `You Lose! ${choiceB} beats ${choiceA}`
		default:
			throw new Error(
				`invalid roundResult ${roundResult}, ` +
				`must be 0 (tie), 1 (choiceA wins), or 2 (choiceB wins)`
			)
	}
}

const computerPlay = function () {
	const randIdx = Math.floor(Math.random() * RPS.length)
	const choice = RPS[randIdx]
	return choice[0].toUpperCase() + choice.slice(1)
}

const restartGame = function () {
	scores.fill(0)
	curRound = 0

	choiceBtns.forEach(btn => btn.disabled = false)

	resultElt.classList.add('hidden')
	resultElt.classList.remove('win', 'lose', 'tie')
	logElt.classList.remove('win', 'lose', 'tie')

	;[logElt, resultElt].forEach(elt => elt.textContent = '')
	userScoreElt.textContent = ComputerScoreElt.textContent = 0
	roundElt.textContent = 1
}

const finalizeGame = function () {
	const [_, userScore, computerScore] = scores

	resultElt.classList.remove('hidden')

	if (userScore === computerScore) {
		resultElt.classList.add('tie')
		resultElt.textContent = 'Tie!'
	}
	else if (userScore > computerScore) {
		resultElt.classList.add('win')
		resultElt.textContent = 'You Win! 🏆'
	}
	else {
		resultElt.classList.add('lose')
		resultElt.textContent = 'You Lose! 💥'
	}

	choiceBtns.forEach(
		btn => {
			btn.disabled = true
		}
	)
}

const playRound = function (userChoice) {
	curRound++

	const computerChoice = computerPlay()
	const result = getRoundResult(userChoice, computerChoice)
	scores[result]++

	const msg = getRoundMsg(userChoice, computerChoice, result)

	logElt.textContent = msg
	logElt.classList.remove('win', 'lose', 'tie')
	logElt.classList.add(['tie', 'win', 'lose'][result])

	roundElt.textContent = curRound;
	[userScoreElt.textContent, ComputerScoreElt.textContent] = [scores[1], scores[2]]

	if (curRound !== numRounds) return
	finalizeGame()
}

choiceBtns.forEach(
	btn => btn.addEventListener('click', e => playRound(e.target.dataset.choice))
)
document.querySelector('.restart').addEventListener('click', restartGame)
document.querySelector('.num-rounds').textContent = numRounds
