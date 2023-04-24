import React, { useState } from 'react';
import Board from './Board';
import styles from './App.module.css';
import { minimax } from './Minimax'

// setting types
type BoardArray = Array<Array<string | null>>;
type Player = 'X' | 'O';
type Mode = 'easy' | 'hard';

// easy mode logic it fills a random cell and ignores winning moves
const computerMoveLogic = (board: BoardArray): [number, number] => {
  const emptyCells: [number, number][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        emptyCells.push([rowIndex, cellIndex])
      }
    })
  });

  const random = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[random]
};

// compares win condition with the board and return coin winner value ('X' or 'O')
const checkWinner = (board: BoardArray): string | null => {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],

    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],

    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0]
    }
  }

  return null
}

function App() {

  // start board 3x3 with null value each one
  const initBoard = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null ));

  // useState section
  const [board, setBoard] = useState<BoardArray>(initBoard);

  const [player, setPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [tie, setTie] = useState<string>('noTie');
  const [difficulty, setDifficulty] = useState<Mode>('easy');

  // if click on Easy button, it redraw the board
  const setEasy = () => {
    setDifficulty('easy');
    setBoard(initBoard);
    setPlayer(player);
    setWinner(null)
    setTie('noTie');
  }

  // if click on Hard button, it redraw the board
  const setHard = () => {
    setDifficulty('hard');
    setBoard(initBoard);
    setPlayer(player);
    setWinner(null)
    setTie('noTie');
  }

  // click event
  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }

    // draw the player coin on board
    const updatedPlayerBoard = board.map((newRow, rowIndex) => 
      newRow.map((cell, cellIndex) => rowIndex === row && cellIndex === col
        ? player
        : cell));

    setBoard(updatedPlayerBoard);

    // check winner
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);

    // check if tie
    const nullVal = updatedPlayerBoard.some((row) => row.some((cell => cell === null)));

    if (!winner && !nullVal) {
      setTie('tie');
      return;
    }

    // Computer's move logic in case we dont have a winner yet
    if (!newWinner) {

      // in hard mode, import minimax.tsx file to get process
      if (difficulty === 'hard') {
        const newPlayer = player === 'X' ? 'O' : 'X'
        const bestMove = minimax(updatedPlayerBoard, newPlayer, checkWinner)
        setTimeout(() => {
          const minimaxBoard = updatedPlayerBoard.map(
            (row, rowIndex) => row.map((col, colIndex) => 
              rowIndex === bestMove?.[0] && colIndex === bestMove[1]
                ? newPlayer : col))
          setBoard(minimaxBoard);
          setWinner(checkWinner(minimaxBoard));
        }, 100);
      }

      // on easy mode, it calls the computer logic created at the beginning of the code
      if (difficulty === 'easy') {
        let [compRow, compCol] = computerMoveLogic(updatedPlayerBoard);
      
        let computerBoard = updatedPlayerBoard.map((newRow, rowIndex) => 
          newRow.map((cell, cellIndex) => rowIndex === compRow && cellIndex === compCol
            ? player === 'X' ? 'O' : 'X'
            : cell));
        setTimeout(() => {
          setBoard(computerBoard);
        }, 100);
        setWinner(checkWinner(computerBoard));
      }
    }
  }

  // restart game 
  const restartGame = () => {
    setBoard(initBoard);
    setPlayer(player);
    setWinner(null)
    setTie('noTie');
  }

  // section used for html functions
  // easy html
  function easyMode() {
    return <div>
      <Board board={board} handleClick={handleOnClick} />
      <div className={styles.Buttons}>
        <button className={styles.ModeSelected}>Easy</button>
        <button className={styles.SetDifficult}
          onClick={() => setHard()}>Hard</button>
      </div>
    </div>
  }

  // hard html
  function hardMode() {
    return <div>
      <Board board={board} handleClick={handleOnClick} />
      <div className={styles.Buttons}>
        <button className={styles.SetDifficult}
          onClick={() => setEasy()}>Easy</button>
        <button className={styles.ModeSelected}>Hard</button>
      </div>
    </div>
  }

  function restart() {
    return <button className={styles.Restart} type='button'
      onClick={() => restartGame()}>Restart</button>
  }

  return (
    <div className={styles.Body}>
      <h1 className={styles.CenterText}>{`Tic-Tac-Toe(${difficulty} mode)`}</h1>

      {!player && <div>
        <button className={styles.SetOrder} onClick={() => setPlayer('X')}>Choose 'X'</button>
        <button className={styles.SetOrder} onClick={() => setPlayer('O')}>Choose 'O'</button>
      </div>}

      {player && <div>
        {difficulty === 'hard' ? hardMode() : easyMode()}

        {winner && <p className={styles.CenterText}>{winner === player ? "You Win" : "You Lose"}</p>}

        {tie && tie === 'tie' ? <p className={styles.CenterText}>It´s a Tie. Try Again...</p> : <></>}
        
        { winner || tie === 'tie' ? <div className={styles.Buttons}>
          {restart()}
        </div> : <></>}
      </div>}


    </div>
  );
}

export default App;
