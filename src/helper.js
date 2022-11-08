export function randomPosition(boardSize) {
	return Math.floor(Math.random() * boardSize);
}

export function randomPositions(amount, boardSize) {
	const positions = [];
	while(positions.length < amount) {
		const position = randomPosition(boardSize);
		if(!positions.includes(position)) positions.push(position);
	}
	return positions;
}

export function randomPositionWithin(positions) {
	return positions[Math.floor(Math.random() * positions.length)]
}