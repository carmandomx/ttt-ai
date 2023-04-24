import React from 'react';
import { useGame } from '../hooks/useGame';

interface BoardProps {
  chip: 'X' | 'O';
}

const Board: React.FC<BoardProps> = ({ chip }) => {
    const { board, setBoard, isPlayerTurn, setIsPlayerTurn } = useGame(chip);
  
    const handleClick = (row: number, col: number) => {
      if (board[row][col] === null && isPlayerTurn) {
        const newBoard = [...board];
        newBoard[row][col] = chip;
        setBoard(newBoard);
        setIsPlayerTurn(false);
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
