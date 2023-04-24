import { useState, useEffect } from 'react';

type BoardState = (null | 'X' | 'O')[][];

const getEmptyCells = (board: BoardState) => {
  const emptyCells: Array<[number, number]> = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        emptyCells.push([row, col]);
      }
    }
  }

  return emptyCells;
};

const makeAiMove = (board: BoardState, aiChip: 'X' | 'O') => {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    return board;
  }

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const newBoard = [...board];
  newBoard[row][col] = aiChip;
  return newBoard;
};

export const useGame = (playerChip: 'X' | 'O') => {
    const [board, setBoard] = useState<BoardState>([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const aiChip = playerChip === 'X' ? 'O' : 'X';
  
    useEffect(() => {
      if (!isPlayerTurn) {
        const newBoard = makeAiMove(board, aiChip);
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }
    }, [board, aiChip, isPlayerTurn]);
  
    return { board, setBoard, isPlayerTurn, setIsPlayerTurn };
  };