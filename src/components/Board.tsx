import { useEffect, useState } from 'react';
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

            // Player only can pick one chip when a cell is empty
            const newBoard = [...board];
            newBoard[rowIndex][colIndex] = 'X'; // Player is X
            setBoard(newBoard);
    
            
            // CPU move
            const emptyTiles: [number, number][] = [];
            newBoard.forEach((row, rowIndex) => {
                row.forEach((tile, colIndex) => {
                    if (tile === null) {
                        emptyTiles.push([rowIndex, colIndex]);
                    }
                });
            });
            const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            newBoard[randomTile[0]][randomTile[1]] = 'O'; // CPU is O
            setBoard(newBoard);

            setInterval(() => {

            }, 1000);

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
