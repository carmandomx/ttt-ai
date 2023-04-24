type Board = Array<Array<string | null>>;

export const minimax = (board: Board
        , player: string | null
        , checkWinner: (board: Board) => string | null)
        : [number, number] => {

    const cleverMoves: Array<[number, number]> = [];

    // scope used to check winning moves for the computer
    board.forEach((row, rowIndex) =>
        row.map((col, colIndex) => {
            if (!board[rowIndex][colIndex]) {
                const clonedBoard = board.map(r => [...r]);
                clonedBoard[rowIndex][colIndex] = player;
                if (checkWinner(clonedBoard) === player) {
                    cleverMoves.unshift([rowIndex, colIndex]);
                }
            }
    }));

    const opponent = player === 'X' ? 'O' : 'X';

    // scope used to check our moves (opponent)
    board.some((row, rowIndex) => row.some((col, colIndex) => {
        if (!board[rowIndex][colIndex]) {
            const clonedBoard = board.map(r => [...r]);

            clonedBoard[rowIndex][colIndex] = opponent;
            if (checkWinner(clonedBoard) === opponent) {
                cleverMoves.push([rowIndex, colIndex]);
                return true
            }
            return false
        }
    }))

    if (cleverMoves.length > 0) {
        return cleverMoves[0];
    }
    
    // if center cell is available the computer get it
    if (!board[1][1]) {
        return[1, 1]
    }

    // if the center is not available the computer will get a random cell
    const emptyCells: Array<[number, number]> = [];
    board.forEach((row, rowIndex) =>
        row.forEach((col, colIndex) => {
            if (!board[rowIndex][colIndex]) {
                emptyCells.push([rowIndex, colIndex]);
            }
        })
    );

    const random = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[random];
}