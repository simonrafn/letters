export default function Square({classNames, onClick, value}) {
	return (
		<button
			className={"square " + classNames}
			onClick={onClick}>
			{value}
		</button>
	);
}