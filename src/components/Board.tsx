import { useState } from 'react';
import './components.css';

// type Tile = 'X' | 'O' | null;
type Tile = 'X' | 'O' | null;

export const Board = () => {
    const [board, setBoard] = useState<Tile[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const handleTileClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] === null) {
            // Player only can pic one chip whean a cell is empty
            const newBoard = [...board];
            newBoard[rowIndex][colIndex] = 'X'; // Player is X
            setBoard(newBoard);
        }
    };
      
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div className='bttnContainer' key={rowIndex}>
                {row.map((tile, colIndex) => (
                    <button className='bttnChips' key={colIndex} onClick={() => handleTileClick(rowIndex, colIndex)}>
                    {tile}
                    </button>
                ))}
                </div>
            ))}
        </div>
    )
}
