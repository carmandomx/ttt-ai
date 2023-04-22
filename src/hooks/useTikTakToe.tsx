import React, { useState } from "react";
type TileValue = "X" | "O" | "";
const useTikTakToe = () => {
  const [playerChip, setPlayerChip] = useState("");
  const [board, setBoard] = useState<TileValue[]>(Array(9).fill(""));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  const handleTileClick = (index: number) => {
    if (board[index] === "" && isPlayerTurn) {
      // Make a copy of the board state
      const newBoard = [...board];
      newBoard[index] = playerChip as TileValue;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  return { playerChip, board, isPlayerTurn, handleTileClick, setPlayerChip };
};

export default useTikTakToe;
