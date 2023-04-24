import React from 'react';
import { useGame } from '../hooks/useGame';
import '../Board.css'

type BoardProps = {
  chip: 'X' | 'O';
  isChipSelected: boolean;
  setIsChipSelected: (value: boolean) => void;
};

const Board: React.FC<BoardProps> = ({ chip, isChipSelected, setIsChipSelected }) => {
  const { board, setBoard, isPlayerTurn, setIsPlayerTurn, gameOver, gameResult, resetGame } = useGame(chip);

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
      {gameOver && (
        <>
          <div className="result-message">{gameResult}</div>
          <div className="restart-container">
  <button className="restart-button" onClick={() => resetGame(() => setIsChipSelected(false))}>
    Restart
  </button>
</div>
        </>
      )}
    </div>
  );
};

export default Board;