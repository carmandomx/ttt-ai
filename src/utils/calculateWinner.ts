import { TileValue } from "../types/types";

type calculateWinnerReturnType = null | undefined | TileValue;

const calculateWinner = (board: TileValue[]): calculateWinnerReturnType => {
  const WINNING_COMBINATIONS = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      //   Return winning chip
      return board[a];
    }
  }

  if (!board.includes(null)) {
    // Return null if there is a draw
    return null;
  }

  //   Return undefined if the game is not over yet
  return undefined;
};

export default calculateWinner;
