import { useState, useEffect } from "react";

const useTicTacToe = (playerChip: "X" | "O" | null) => {
  //initialization of the board
  const [board, setBoard] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  //states for the winner and if the current  turn is the players
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  useEffect(() => {
    if (playerChip) {
      setWinner(null);
      setBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);

      // If player chooses 'O', CPU goes first
      if (playerChip === "O") {
        const initialCpuMoveBoard = cpuMove([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
        setBoard(initialCpuMoveBoard);
      }
    }
  }, [playerChip]);

  const checkWinner = (
    board: string[][]
  ): { winner: "X" | "O" | null; winningLine: number[][] | null } => {
    const lines = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    const lineIndices = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    //checking every winning combination...
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line[0] && line[0] === line[1] && line[0] === line[2]) {
        //store de winner and also the winning combination to highlight it
        return { winner: line[0] as "X" | "O", winningLine: lineIndices[i] };
      }
    }
    return { winner: null, winningLine: null };
  };

  const checkDraw = (board: string[][]) => {
    for (const row of board) {
      for (const cell of row) {
        if (!cell) {
          //check is there  any empty tile...
          return false;
        }
      }
    }
    return true; //if no empty tile, draw is true!
  };

  const cpuMove = (board: string[][]) => {
    const cpuChip = playerChip === "X" ? "O" : "X";
    // Arbitrary answer by the cpu
    while (true) {
      const first = Math.floor(Math.random() * 3);
      const second = Math.floor(Math.random() * 3);
      const position = board[first][second];
      if (!position) {
        board[first][second] = cpuChip;
        return board;
      }
    }
  };

  const makeMove = (row: number, col: number) => {
    //while the tile is empty, there is not a winner, and is the players turn... you can move
    if (board[row][col] || winner || !isPlayerTurn) {
      return;
    }

    // Add player's move to the board
    const newBoard = [...board];
    newBoard[row][col] = playerChip!;
    setBoard(newBoard);

    //player just moved so... CPU turn
    setIsPlayerTurn(false);

    //check for winner!
    const { winner: newWinner, winningLine } = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);

      // Highlight the winning combination with star emojis
      const highlightedBoard = [...newBoard];
      winningLine!.forEach(([row, col]) => {
        highlightedBoard[row][col] = "⭐";
      });
      setBoard(highlightedBoard);
      return;
    }

    // Check for draw
    if (checkDraw(newBoard)) {
      setWinner("Draw");
      return;
    }

    // Add CPU's move to the board
    const boardAfterCpuMove = cpuMove(newBoard);
    setBoard(boardAfterCpuMove);

    //Switch turn to player
    setIsPlayerTurn(true);

    // Check for winner or draw again
    const { winner: finalWinner, winningLine: finalWinningLine } =
      checkWinner(boardAfterCpuMove);
    if (finalWinner) {
      setWinner(finalWinner);

      // Highlight the winning combination with star emojis
      const finalHighlightedBoard = [...boardAfterCpuMove];
      finalWinningLine!.forEach(([row, col]) => {
        finalHighlightedBoard[row][col] = "⭐";
      });
      setBoard(finalHighlightedBoard);
      return;
    }

    // Check for draw again
    if (checkDraw(boardAfterCpuMove)) {
      setWinner("Draw");
      return;
    }
  };

  //reseting the board to all empty
  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return { board, winner, isPlayerTurn, makeMove, resetGame };
};

export default useTicTacToe;
