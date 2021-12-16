'use strict'

const RPS = ['rock', 'paper', 'scissors']
const numRounds = 3


const computerPlay = function () {
	const randIdx = Math.floor(Math.random() * RPS.length)
	const choice = RPS[randIdx]
	return choice[0].toUpperCase() + choice.slice(1)
}

const userPlay = function () {
	while (1) {
		const choice = prompt(
			`Choose one of [${RPS.join(', ')}], case insensitive`
		)?.trim()

		if (choice && RPS.includes(choice.toLowerCase())) return choice

		if (choice == undefined) console.error('your choice was empty, try again')
		else console.error(
			`invalid choice "${choice}", choose a valid one from [${RPS.join(' ')}]`
		)
	}
}

const game = function () {

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


	const scores = [0, 0, 0] // [tie, user, computer]

	for (let i = 0; i < numRounds; i++) {
		const userChoice = userPlay()
		const computerChoice = computerPlay()

		const result = getRoundResult(userChoice, computerChoice)
		scores[result]++

		console.log(getRoundMsg(userChoice, computerChoice, result))

	}

	console.log('\n\n')
	console.log('Result:')

	const [numTies, userScore, computerScore] = scores

	if (userScore === computerScore) console.log('%cTie!', 'color: royalblue;')
	else if (userScore > computerScore) console.log('%cYou Win!', 'color: greenyellow;')
	else console.log('%cYou Lose!', 'color: orangered;')

	console.log(`${numRounds} rounds:`)
	console.log(`\tyour score is ${userScore}`)
	console.log(`\tcomputer score is ${computerScore}`)
	console.log(`\twith ${numTies} tie(s)`)
}


game()
