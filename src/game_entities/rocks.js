import * as Helper from '../helper.js'

export const SYMBOL = "R";

const rockRatio = 4;

const rockAmount = (boardSize) => boardSize/rockRatio;

export function getStartingRocks(boardSize) {
	const rocks = Helper.randomPositions(rockAmount(boardSize), boardSize);

	return rocks.map((position) => (
		{
			classNames: "rock",
			symbol: SYMBOL,
			position: position,
		}
	));
}