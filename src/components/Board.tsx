import React, { useState } from 'react';

interface BoardProps {
  chip: 'X' | 'O';
}

type BoardState = (null | 'X' | 'O')[][];

const Board: React.FC<BoardProps> = ({ chip }) => {
  const [board, setBoard] = useState<BoardState>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] === null) {
      const newBoard = [...board];
      newBoard[row][col] = chip;
      setBoard(newBoard);
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <button
              className="board-cell"
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
