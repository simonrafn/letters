import * as Helper from '../helper.js'
import * as Player from './player.js'

export const SYMBOL = "O";

const creatureAmount = (boardSize) => Math.sqrt(boardSize);

function getRange(position, rowLength) {
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

function getNextPosition(creature, squares) {
	const positions = [creature.position]
	const priorityPos = []
	const range = getRange(creature.position, Math.sqrt(squares.length))
	range.forEach(position => {
		if(!squares[position].occupied) {
			positions.push(position)
			if(squares[position].symbol === Player.SYMBOL)
				priorityPos.push(position)
		}
	})

	if(priorityPos.length > 0) return Helper.randomPositionWithin(priorityPos)
	return Helper.randomPositionWithin(positions)
}

export function moveCreatures([...squares]) {
	const creatures = [...squares.filter(square => 
		square.symbol === SYMBOL && square.occupied)]
	creatures.forEach((creature, i) => {
		const nextPosition = getNextPosition(creature, squares)
		// leave a trail
		squares[creature.position] = {
			symbol: SYMBOL,
			classNames: "trail",
			occupied: false,
		}
		creature.position = nextPosition
		squares[nextPosition] = {...creature, occupied: true}
	})
	
	return squares
}

export function getStartingCreatures(boardSize) {
	const creatures = Helper.randomPositions(creatureAmount(boardSize), boardSize);

	return creatures.map((position) => (
		{
			classNames: "creature",
			symbol: SYMBOL,
			position: position,
		}
	));
}