import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

interface GameProps {
  playerSymbol: string;
}

const Game: React.FC<GameProps> = ({ playerSymbol }) => {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(playerSymbol === 'X');
  const [gameOver] = useState(false);

  useEffect(() => {
    if (!gameOver && !xIsNext && playerSymbol) {
      // Wait a moment before making a move
      const timer = setTimeout(() => {
        const move = findBestMove(squares, playerSymbol);
        handleClick(move);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [squares, xIsNext, playerSymbol, gameOver]);

  const handleClick = (i: number) => {
    const newSquares = [...squares];
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? playerSymbol : getOpponentSymbol(playerSymbol);
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull(squares)) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? playerSymbol : getOpponentSymbol(playerSymbol)}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>
          <h2>{status}</h2>
          <h3>You choose {playerSymbol}</h3>
          </div>
      </div>
      <div className='rstButton'>
        <button className='restartBtn' onClick={()=>window.location.reload()}>Restart</button>
      </div>
    </div>
  );
};

export default Game;

function calculateWinner(squares: string[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  
    return null;
  }

  function isBoardFull(squares: string[]): boolean {
    return squares.every((square) => square !== '');
  }

function getOpponentSymbol(playerSymbol: string) {
  return playerSymbol === 'X' ? 'O' : 'X';
}

function findBestMove(squares: string[], player: string): number {
    const opponent = player === 'X' ? 'O' : 'X';
  
    // check if center is available and return its index
    if (squares[4] === '') {
      return 4;
    }
  
    // check if there's a winning move for the player and return its index
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === '') {
        const newSquares = [...squares];
        newSquares[i] = player;
        if (calculateWinner(newSquares) === player) {
          return i;
        }
      }
    }
  
    // check if there's a winning move for the opponent and block it
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === '') {
        const newSquares = [...squares];
        newSquares[i] = opponent;
        if (calculateWinner(newSquares) === opponent) {
          return i;
        }
      }
    }
  
    // choose a random move
    const emptySquares = squares.reduce((acc, square, index) => {
      if (square === '') {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);
  
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  }