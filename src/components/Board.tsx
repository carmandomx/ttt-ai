import React from 'react';
import { useGame } from '../hooks/useGame';
import '../Board.css'

type BoardProps = { //Typing for the board
  chip: 'X' | 'O'; //The chips can be "X" or "O"
  isChipSelected: boolean; //The value of the selected chip must be a boolean
  setIsChipSelected: (value: boolean) => void; //And the Set for chip will be a function with a bolean prop that will return a void.
};

const Board: React.FC<BoardProps> = ({ chip, isChipSelected, setIsChipSelected }) => { //Functional componen that will destructure the chip, the state of the chip and the function to set the chip
  const { board, setBoard, isPlayerTurn, setIsPlayerTurn, gameOver, gameResult, resetGame } = useGame(chip); //Use of the values returned in the useGame hook.

  const handleClick = (row: number, col: number) => {  //Function to set the player's chip in the board
    if (board[row][col] === null && isPlayerTurn && !gameOver) { //If the cell is null, is the player's turn and the game isn't over.
      const newBoard = [...board]; //Make a new board spreading the old board.
      newBoard[row][col] = chip; //Set the cell to the player's chip
      setBoard(newBoard); //Set the board to the new board with the player's chip
      setIsPlayerTurn(false); //Indicate that the player's turn is over 
    }
  };

  return ( //return statement, which is responsible for rendering the JSX
    <div>
      <div className="board">
        {board.map((row, rowIndex) => ( //nside the board div, the code maps over the board state (which is a 3x3 array representing the game board) and creates a new div with the class board-row for each row.
          <div key={rowIndex} className="board-row">
            {row.map((cell, cellIndex) => ( //Inside each board-row div, the code maps over each cell in the current row and creates a new div with the class board-cell.  The content of the cell is either 'X', 'O', or null (empty). 
              <div
                key={cellIndex}
                className="board-cell"
                onClick={() => handleClick(rowIndex, cellIndex)} //When a cell is clicked, it calls the handleClick function with the rowIndex and cellIndex as arguments.
              >
                {cell}  {/*Display of the current cell, can be "X", "O" or null */}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && ( //If the gameOver state is true, it means the game has ended. In this case, the code renders a div with the class result-message to display the game result, either "Draw", "Player wins" or "IA wins".
        <>
        <div className="result-message">{gameResult}</div>
        <div className="restart-container"> {/* If the game is over, a div with the class restart-container is rendered. Inside this container, there is a "Restart" button with the class restart-button.  */}
            <button className="restart-button" onClick={() => resetGame(() => setIsChipSelected(false))}> {/*When the button is clicked, it calls the resetGame function and resets the isChipSelected state to false. This will prompt the user to choose a chip again before starting a new game. */}
                Restart
            </button>
        </div>
        </>
      )}
    </div>
  );
};

export default Board; //Export of the board functional component.