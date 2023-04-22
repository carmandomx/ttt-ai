import { TileValue } from "./../types/types";
import { useState, useEffect } from "react";
import makeCPUMove from "../utils/makeCPUMove";
import calculateWinner from "../utils/calculateWinner";
const useTikTakToe = () => {
  const [playerChip, setPlayerChip] = useState("");
  const [board, setBoard] = useState<TileValue[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<TileValue | null>(null);
  const [draw, setDraw] = useState(false);

  const handleTileClick = (index: number): void => {
    if (winner || board[index] !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = playerChip as TileValue;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
      setIsPlayerTurn(false);
    } else if (!board.includes(null)) {
      // Game is a draw
      setDraw(true);
      setIsPlayerTurn(false);
    } else if (!isPlayerTurn) {
      makeCPUMove(board, playerChip, setBoard, setIsPlayerTurn);
    }
  }, [board, isPlayerTurn, playerChip, winner]);
  // console.log({ board });

  return {
    playerChip,
    board,
    isPlayerTurn,
    winner,
    draw,
    handleTileClick,
    setBoard,
    setIsPlayerTurn,
    setPlayerChip,
  };
};

export default useTikTakToe;
