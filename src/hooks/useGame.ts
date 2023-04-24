import { useState, useEffect } from 'react';

type BoardState = Array<Array<'X' | 'O' | null>>; //Typing for the board, it can only contain arrays with the values of "X", "O" or null

const checkWin = (board: BoardState, chip: 'X' | 'O'): boolean => { //Function to check if there is a winner, it has a board and a chip of props and return a boolean
  // Check rows
  for (let row = 0; row < 3; row++) { //For loop that iterates over the 3 rows, if the same chip is in the three spaces of a same row, returns true.
    if (board[row][0] === chip && board[row][1] === chip && board[row][2] === chip) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) { //For loop that iterates over the 3 columns, if the same chip is in the three spaces of a same column, returns true.
    if (board[0][col] === chip && board[1][col] === chip && board[2][col] === chip) {
      return true;
    }
  }

  // Check diagonals
  //If the same chip is whichever of the 2 possible diagonals, returns true.
  if (board[0][0] === chip && board[1][1] === chip && board[2][2] === chip) { 
    return true;
  }
  if (board[0][2] === chip && board[1][1] === chip && board[2][0] === chip) {
    return true;
  }

  return false; //If none of this conditions is met, return false.
};

const makeAiMove = (board: BoardState, chip: 'X' | 'O'): BoardState => { //Function to make the artificial intelligence make its move. It recive a board and a chip as props, and returns a Board.
    const availableMoves: Array<[number, number]> = []; //Initializes an empty array called availableMoves that will store all the available moves on the board.
  //Then two nested for loops are used to iterate over every cell on the board. The outer loop iterates over each row, and the inner loop iterates over each column. For each cell,
  //the function checks whether it is null, which means the cell is empty and available for the AI to move.
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          availableMoves.push([row, col]); //If the cell is empty, the function pushes its row and column indices to the availableMoves array. This array will contain all the available moves that the AI can choose from.
        }
      }
    }
  //After iterating over all cells on the board, the function checks whether there are any available moves in the availableMoves array.
  //If there are available moves, the function randomly selects one of the available moves from the availableMoves array.   
  if (availableMoves.length > 0) {
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]; //Then, this expresion generates a random integer between 0 and the length of the availableMoves array, which is then used as an index to select a random move from the array.
      const newBoard = [...board]; //Once a random move has been selected, the function creates a new board state by making a shallow copy of the original board using the spread syntax . This creates a new array with the same elements as board.
      newBoard[randomMove[0]][randomMove[1]] = chip; //The function then applies the AI's chip to the selected cell in the new board state by setting the value of the corresponding row and column to chip.
      return newBoard; //Finally, the function returns the new board state with the AI's move applied.
    }
  
    return board; //If there are no available moves, the function simply returns the original board state as-is.
  };

export const useGame = (playerChip: 'X' | 'O') => { 
    const [board, setBoard] = useState<BoardState>([ //UseState for the board with the typing of the board defined in the line 3, it sets an array of 3x3 with everything in null as initial state.
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); //UseState for checking if is the player's turn. Is a bolean that is initialized as true.
    const aiChip = playerChip === 'X' ? 'O' : 'X'; //Definition of the AI chip, if the user has the "X" chip the AI gets the "O" chip, and if not, gets the "X" chip.
    const [gameOver, setGameOver] = useState<boolean>(false); //UseState for checking if the game is over. Is a bolean that is initialized as false.
    const [gameResult, setGameResult] = useState<string | null>(null); //Use state that will be use to display the result of the game, it is typed as a string or null and its initialized as null.

    const resetGame = (callback: () => void) => { //Function to reset the game, it gets an callback function that returns void as prop.
        setBoard([ //The function set all the board to null
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]);
        setIsPlayerTurn(true); //The player turn to true
        setGameOver(false); //The game over state to false
        setGameResult(null); //And the game result to null.
        //Basically, it returns all "useStates" to their default form
        callback(); //This callback will later be used to set the isChipSelected useState to false.
      };

    useEffect(() => { 
        if (checkWin(board, playerChip)) { //With the checkWin function, if the player wins
          setGameOver(true); //Set the game over to true
          setGameResult('Player wins'); //And the game result to "Player wins"
        } else if (checkWin(board, aiChip)) { //Else, if the AI wins
          setGameOver(true); //Set the game over to true
          setGameResult('AI wins'); //And the game result to "AI wins"
        } else if (board.every(row => row.every(cell => cell !== null))) { //Else, the whole board is checked, and if there is no cell in null
          setGameOver(true); //The game over is set to true 
          setGameResult('Draw'); //and the game result is set to "Draw"
        } else { //This else is if the game hasn't finished
          if (!isPlayerTurn) {  //And if is not the player's turn
            const newBoard = makeAiMove(board, aiChip); //A new board variable is created with the function makeAiMove passing the board and the aiChip as props.
            setBoard(newBoard); //Then the board is setted to this new board with the setBoard from thr useState.
            setIsPlayerTurn(true); //And it indicates that is the player turn by setting true the useState.
          }
        }
      }, [board, aiChip, isPlayerTurn, playerChip]); //Set the dependencies. 
      
      return { board, setBoard, isPlayerTurn, setIsPlayerTurn, gameOver, gameResult, resetGame }; //Return the useStates.
  };