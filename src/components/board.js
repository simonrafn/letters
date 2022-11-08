import React from '../'
import Square from './square.js';

function renderRows(Squares, rowLength) {
  const rows = [];

  for(let i=0;i<rowLength**2;i+=rowLength) {
    rows.push(
      <div className="board-row" key={i/rowLength}> 
        {Squares.slice(i, i+rowLength)}
      </div>
    );
  }

  return rows;
}

export default function Board({ squares, onClick, rowLength }) {
	const Squares = squares.map((square, index) => (
		<Square
			value={square.symbol}
			classNames={square.classNames}
			onClick={() => onClick(index)}
			key={index}
		/>
	));

	const rows = renderRows(Squares, rowLength);

	return (
		<div>
			{ rows }
		</div>
	);
}