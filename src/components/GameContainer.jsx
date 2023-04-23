import React, { useState, useEffect } from 'react'
import GameBoard from './GameBoard.jsx'
import Settings from './Settings.jsx'
import './GameContainer.css'

const GameContainer = () => {
  // Initialize board
  const emptyBoard = ['', '', '', '', '', '', '', '', ''];
  const availableBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const [gameSquares, setGameSquares] = useState(emptyBoard);
  // Update available squares
  const [availableSquares, setAvailableSquares] = useState(availableBoard);
  // Who won the game
  const [hasWon, setHasWon] = useState('');
  // Chips X O
  const [userChar, setUserChar] = useState('o');
  const [compChar, setCompChar] = useState('x');
  // Msg to player
  const [message, setMessage] = useState('');

  const maxDepth = 4;
  const decisionTree = new Map();

  useEffect(() => {
    setHasWon(checkForState());
  }, [gameSquares]);

  useEffect(() => {
    if (compChar === 'x' && boardCleared(gameSquares)) {
      findBestMove(false);
    }
  })

  // AI play
  useEffect(() => {
    if (userChar === 'x') {
      setCompChar('o');
    } 
    else if (userChar === 'o') {
      setCompChar('x');
    }
  }, [userChar]);

  // Set who won
  useEffect(() => {
    if (hasWon === 'tie') {
      setMessage('it is a tie!')
    } 
    else if (hasWon) {
      setMessage(`${hasWon} wins!`);
    } 
    else if (boardCleared(gameSquares) && userChar === 'o') {
      setMessage('you first');
    } 
    else {
      setMessage('');
    }
  })

  // Check board state
  const checkForState = (squares = gameSquares) => {
    const wins = [
      // horizontals
      [0, 1, 2], 
      [3, 4, 5],
      [6, 7, 8],
       // verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8], 
      [2, 4, 6]
    ]

    if (boardCleared(gameSquares)) {
      return '';
    }

    // check for wins by trio
    for (var win of wins) {
      const sq1 = squares[win[0]];
      const sq2 = squares[win[1]];
      const sq3 = squares[win[2]];
      const winCheck = [sq1, sq2, sq3];

      if (winCheck.every((sq) => sq === winCheck[0] && sq !== '')) {
        return sq1;
      }
    }

    // Board is full with chips so no more moves
    // Win review failed, it's a tie
    if (gameSquares.every((sq) => sq !== '')) {
      return 'tie';
    }

    // Board isn't full and win review failed
    return '';
  }
  

  const updateBoard = (idx, asPlayer = true) => {
    asPlayer
      ? updateUsedSquares(idx, userChar)
      : updateUsedSquares(idx, compChar)

    updateAvailableSquares(idx);
  }

  // Ppdate full squares
  const updateUsedSquares = (idx, val) => {
    gameSquares.splice(idx, 1, val);
    setGameSquares([...gameSquares]);
  }

  // Update available squares
  const updateAvailableSquares = (idx) => {
    const index = availableSquares.indexOf(idx);
    if (index > -1) {
      availableSquares.splice(index, 1);
    }
    setAvailableSquares([...availableSquares]);
  }

  // Board is clean
  const clearBoard = () => {
    setGameSquares(emptyBoard);
    setAvailableSquares(availableBoard);
  }

  // Board is empty
  const boardCleared = (board) => board.every((sq) => sq === '');

  // Recursive minimax algorithm
  const findBestMove = (forMax = true, depth = 0, gs = gameSquares, as = availableSquares) => {
    
    // We are starting from square one
    if (depth === 0) {
      decisionTree.clear();
    }

    // Endpoint in currently running scenario.
    // Return value of this path.
    if (checkForState(gs) !== '' || depth === maxDepth) {
      // Time for some arbitrary decision making
      if (checkForState(gs) === 'o') {
        // If the move benefits o, it is max
        return 100 - depth
      } else if (checkForState(gs) === 'x') {
        // If the move benefits x, it is min
        return -100 + depth
      } else {
        return 0
      }
    }

    // if forMax, o benefits then !forMax, x benefits
    // set base minimax value.
    let base = forMax ? -100 : 100;
    const char = forMax ? 'o' : 'x';

    for (var idxAsVal of as) {
      // Set up a imaginary game board to iterate over all scenarios (like my anxiety)
      const squares = [...gs];
      const openSquares = [...as];
      // Try a move and subsequent recursion
      squares.splice(idxAsVal, 1, char);
      openSquares.splice(idxAsVal, 1);
      const nodeVal = findBestMove(!forMax, depth + 1, squares, openSquares);

      base = forMax ? Math.max(base, nodeVal) : Math.min(base, nodeVal);

      // Ehen we are not recursing, then do this.
      if (depth === 0) {
        const moves = decisionTree.has(nodeVal)
          ? [...decisionTree.get(nodeVal), idxAsVal]
          : [idxAsVal]

        decisionTree.set(nodeVal, moves)
      }
    }

      // Ehen we are not recursing, then do this.
    if (depth === 0) {
      // Now arbitrarily choose one.

      const moveArr = boardCleared(as) ? [0, 2, 4, 6, 8] : decisionTree.get(base);
      const move = moveArr[Math.floor(Math.random() * moveArr.length)];

      updateBoard(move, false);
      return move;
    }
    // Else, return the maximized move for the next round of recursion.
    return base;
  }

  return (
    <div className='gameContainer'>
      <div className='titleContainer'>
        Tic Tac Toe Game
      </div>
      <div>
          <Settings
            clearBoard={clearBoard}
            done={hasWon}
            updateUserChar={setUserChar}
            userChar={userChar}
          />
          <div className='messageContainer'>
            {message}
          </div>
        </div>
      <div className='mainContainer'>
        <GameBoard
          done={hasWon}
          findBestMove={findBestMove}
          gameSquares={gameSquares}
          updateBoard={updateBoard}
          userChar={userChar}
        />
        
      </div>
    </div>
  )
}

export default GameContainer
