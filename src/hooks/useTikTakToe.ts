import React, { useState } from "react";
import makeCPUMove from "../utils/makeCPUMove";
import { TileValue } from "../types/types";
const useTikTakToe = () => {
  const [playerChip, setPlayerChip] = useState("");
  const [board, setBoard] = useState<TileValue[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  const handleTileClick = (index: number): void => {
    if (board[index] !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = playerChip as TileValue;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  if (!isPlayerTurn) {
    makeCPUMove(board, playerChip, setBoard, setIsPlayerTurn);
  }

  return {
    playerChip,
    board,
    isPlayerTurn,
    handleTileClick,
    setBoard,
    setIsPlayerTurn,
    setPlayerChip,
  };
};

export default useTikTakToe;
