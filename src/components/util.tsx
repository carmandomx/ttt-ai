export const getCleverMoves = (
  board: Array<Array<string | null>>,
  player: string,
  checkWinner: (board: Array<Array<string | null>>) => string | null
) : [number, number] => {
  const smartMoves: Array<[number, number]> = [];
  //check winning move for the computer
  board.forEach((row, rowIndex) =>
    row.map((col, colIndex) => {
      if (!board[rowIndex][colIndex]) {
        const clonedBoard = board.map((r) => [...r]);
        clonedBoard[rowIndex][colIndex] = player;
        if (checkWinner(clonedBoard) === player) {
          smartMoves.unshift([rowIndex, colIndex]);
        }
      }
    })
  );
  //Opponent moves for winning
  const opponent = player === "X" ? "O" : "X";

  board.some((row, rowIndex) =>
    row.some((col, colIndex) => {
      if (!board[rowIndex][colIndex]) {
        const clonedBoard = board.map((r) => [...r]);
        //need fill clonedBoard
        clonedBoard[rowIndex][colIndex] = opponent;
        if (checkWinner(clonedBoard) === opponent) {
          smartMoves.push([rowIndex, colIndex]);
          return true;
        }
        return false;
      }
    })
  );
  //winning move is found
  if (smartMoves.length > 0) {
    return smartMoves[0];
  }
  //If there are no clever moves we should check if the center cell is available

  //Choose the center cell
  if (!board[1][1]) {
    return [1, 1];
  }

  //random move
  const emptyCells: Array<[number, number]> = [];
  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if (!board[rowIndex][colIndex]) {
        emptyCells.push([rowIndex, colIndex]);
      }
    })
  );

  const randomCell = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomCell];
};
