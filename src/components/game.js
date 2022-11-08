import React, { useState, useEffect, useRef } from 'react';
import Board from './board.js';
import Square from './square.js';
import * as Rocks from '../game_entities/rocks.js';
import * as Creatures from '../game_entities/creatures'
import * as Player from '../game_entities/player'

const rowLength = 15;
const boardSize = rowLength**2;

function getStartingState() {
	console.log("Getting starting state...")

	const squares = Array(boardSize).fill({})

	const creatures = Creatures.getStartingCreatures(boardSize);
	creatures.forEach((creature) => {
 		squares[creature.position] = {... creature, occupied: true}
	});

	const rocks = Rocks.getStartingRocks(boardSize);
	rocks.forEach((rock) => {
 		squares[rock.position] = {...rock, occupied: true};
	});

	const player = Player.getStartingPlayer(boardSize);
	squares[player.position] = {...player, occupied: true}

	return { squares, creatures, rocks }
}

function updateScoreBoard(setStatus, squares) {
	const totalSquares = squares.length
	const creatureSquares = squares.filter(square => square.symbol === Creatures.SYMBOL).length
	const playerSquares = squares.filter(square => square.symbol === Player.SYMBOL).length

	const status = {}
	status.player = "Player controlled: " + playerSquares + "/" + totalSquares + 
		" (" + Math.floor((playerSquares/totalSquares) * 100) + "%)."
	status.creatures = "Creature controlled: " + creatureSquares + "/" + totalSquares + 
		" (" + Math.floor((creatureSquares/totalSquares) * 100) + "%)."
		
	setStatus(status)
}

export default function Game() {
	//const status = "Work in progress...";

	const [state, setState] = useState(getStartingState)
	const [status, setStatus] = useState({player: "Move!"})
	
	function handleClick(i) {
		let newSquares = [...state.squares]
		let newPlayer = {...state.player}
		
		const playerChange = Player.move(i, newSquares) 
		if(!playerChange) return // abort if it was an illegal move
		newSquares = playerChange

		newSquares = Creatures.moveCreatures(newSquares)

		updateScoreBoard(setStatus, newSquares)

		setState({
			squares: newSquares, 
			player: newPlayer,
			rocks: state.rocks,
		})
	}	

  return (
<div className="game">
	<div className="game-board">
		<Board
			squares={state.squares}
			rowLength={rowLength}
			onClick={(i) => handleClick(i)}
		/>
	</div>
	<div className="game-info">
		<div>{status.player}</div>
		<div>{status.creatures}</div>
		<div>First to <b>50%</b> wins</div>
	</div>
	
</div>
  );
}