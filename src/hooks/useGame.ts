import { useState, useEffect } from 'react';

type BoardState = Array<Array<'X' | 'O' | null>>;

const checkWin = (board: BoardState, chip: 'X' | 'O'): boolean => {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === chip && board[row][1] === chip && board[row][2] === chip) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === chip && board[1][col] === chip && board[2][col] === chip) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] === chip && board[1][1] === chip && board[2][2] === chip) {
    return true;
  }
  if (board[0][2] === chip && board[1][1] === chip && board[2][0] === chip) {
    return true;
  }

  return false;
};

const makeAiMove = (board: BoardState, chip: 'X' | 'O'): BoardState => {
    const availableMoves: Array<[number, number]> = [];
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          availableMoves.push([row, col]);
        }
      }
    }
  
    if (availableMoves.length > 0) {
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoard = [...board];
      newBoard[randomMove[0]][randomMove[1]] = chip;
      return newBoard;
    }
  
    return board;
  };
  
export const useGame = (playerChip: 'X' | 'O') => {
    const [board, setBoard] = useState<BoardState>([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const aiChip = playerChip === 'X' ? 'O' : 'X';
    const [gameOver, setGameOver] = useState<boolean>(false);
  
    useEffect(() => {
      if (checkWin(board, playerChip) || checkWin(board, aiChip)) {
        setGameOver(true);
      } else {
        if (!isPlayerTurn) {
          const newBoard = makeAiMove(board, aiChip);
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }
    }, [board, aiChip, isPlayerTurn, playerChip]);
  
    return { board, setBoard, isPlayerTurn, setIsPlayerTurn, gameOver };
  };