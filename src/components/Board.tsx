import React from "react";

interface BoardProps {
  board: string[][];
  makeMove: (row: number, col: number) => void;
}

const Board = ({ board, makeMove }: BoardProps) => (
  <div className="rows">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="cols">
        {row.map((cell, colIndex) => (
          <button
            className={`tile${rowIndex}${colIndex}`}
            key={colIndex}
            onClick={() => makeMove(rowIndex, colIndex)}
          >
            {cell}
          </button>
        ))}
        <h2>{}</h2>
      </div>
    ))}
  </div>
);

export default Board;
