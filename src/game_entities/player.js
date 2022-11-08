import * as Helper from '../helper.js'
import * as Creatures from './creatures.js'

export const SYMBOL = "X";

function range(position, rowLength) {
	const range = [
		position + 1,
		position - 1,
		position + rowLength,
		position - rowLength
	]

	// remove positions that are outside the gameboard
	range.forEach((position, index) => {
		if(position >= rowLength**2 || position < 0)
			range.splice(index, 1);
	});

	return range;
}

function withinRange(position, playerPosition, boardSize) {
	return range(playerPosition, Math.sqrt(boardSize)).includes(position)
}

/*
// add a class to the squares that are in range of the player
// used for e.g. different hover effect
function setInPlayerRangeSquares(playerPosition, squares) {
	const inRangeClassName = "in-player-range"
	const inRange = range(playerPosition, Math.sqrt(squares.length))

	inRange.forEach(position => {
		if(!squares[position].occupied) {
			squares[position].classNames = squares[position].classNames + inRangeClassName
			console.log("Changed this square: ")
			console.log(squares[position])
		}
	})
}
*/

// don't need to call any function to "kill" them but just for powerup/levelup etc.
function attack() {

}

export function move(position, [...squares]) {
	const playerPosition = squares.findIndex(square => 
		(square.symbol === SYMBOL && square.occupied))
	// abort if it's out of range
	if(!withinRange(position, playerPosition, squares.length)) return
	// abort if it's an illegal move occupied
	if(squares[position].occupied){ 
		if(squares[position].symbol === Creatures.SYMBOL) {
			attack()
		} else return
	}

	squares[position] = {...squares[playerPosition]}

	// leave a trail
	squares[playerPosition] = {
		symbol: SYMBOL,
		classNames: "trail",
		occupied: false,
	}

	//setInPlayerRangeSquares(playerPosition, squares)

	return squares
}

export function getStartingPlayer(boardSize) {
	const player = {
		symbol: "X",
		position: Helper.randomPosition(boardSize),
		classNames: "player",
	};

	return player;
}