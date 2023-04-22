import { TileValue } from "./../types/types";
import { useState, useEffect } from "react";
import makeCPUMove from "../utils/makeCPUMove";
import calculateWinner from "../utils/calculateWinner";
// import xSound from "";
const useTikTakToe = () => {
  const [playerChip, setPlayerChip] = useState("");
  const [board, setBoard] = useState<TileValue[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<TileValue | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleTileClick = (index: number): void => {
    // The game does not start if you have not picked a chip OR there is a winner OR the square is has already been clicked
    if (winner || board[index] !== null || !playerChip) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = playerChip as TileValue;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // Function to reset the game
  const resetGame = () => {
    setPlayerChip("");
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setDraw(false);
    setGameStarted(false);
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

  return {
    playerChip,
    board,
    isPlayerTurn,
    winner,
    draw,
    gameStarted,
    handleTileClick,
    setBoard,
    setIsPlayerTurn,
    setPlayerChip,
    resetGame,
    setGameStarted,
  };
};

export default useTikTakToe;
