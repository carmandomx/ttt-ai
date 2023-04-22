import { TileValue } from "../types/types";
const makeCPUMove = (
  board: TileValue[],
  playerChip: string,
  setBoard: React.Dispatch<React.SetStateAction<TileValue[]>>,
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const availableMoves = board
    .map((tile, index) => (tile === null ? index : null))
    .filter((tile) => tile !== null);

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const cpuMoveIndex = availableMoves[randomIndex];

  const newBoard = [...board];
  if (cpuMoveIndex !== null) {
    newBoard[cpuMoveIndex] = playerChip === "X" ? "O" : "X";
  }
  setBoard(newBoard);
  setIsPlayerTurn(true);
};
export default makeCPUMove;
