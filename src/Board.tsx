import React from 'react'
import styles from './Board.module.css'

type BoardProps = {
    board: Array<Array<string | null>>,
    handleClick: (row: number, col: number) => void;
};

const Board = ({board, handleClick}: BoardProps) => {
  return (
    <div className={styles.Board}>
        {board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.BoardRow}>
                {row.map((cell, cellIndex) => (
                    <button key={cellIndex} className={styles.Cell}
                        onClick={() => handleClick(rowIndex, cellIndex)} >
                        {cell}
                    </button>
                ))}
            </div>
            ))}
    </div>
  )
}

export default Board