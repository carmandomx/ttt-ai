import React from 'react';
import { useGame } from '../hooks/useGame';

type BoardProps = {
  chip: 'X' | 'O';
};

const Board: React.FC<BoardProps> = ({ chip }) => {
  const { board, setBoard, isPlayerTurn, setIsPlayerTurn, gameOver, gameResult } = useGame(chip);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] === null && isPlayerTurn && !gameOver) {
      const newBoard = [...board];
      newBoard[row][col] = chip;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  return (
    <div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="board-cell"
                onClick={() => handleClick(rowIndex, cellIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div className="result-message">{gameResult}</div>}
    </div>
  );
};

export default Board;
