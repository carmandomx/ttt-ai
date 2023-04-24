import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Prompt from "./components/Prompt";
import Result from "./components/Result";
import useTicTacToe from "./hooks/useTicTacToe";

const App = () => {
  //necesary states
  const [playerChip, setPlayerChip] = useState<"X" | "O" | null>(null);
  const { board, winner, isPlayerTurn, makeMove, resetGame } =
    useTicTacToe(playerChip);

  //setting either X or O for the player
  const handleChipSelection = (chip: "X" | "O") => {
    setPlayerChip(chip);
  };

  //restart
  const handleRestart = () => {
    resetGame();
    setPlayerChip(null);
  };

  return (
    <div className="App">
      {!playerChip && <Prompt onSelectChip={handleChipSelection} />}
      {playerChip && <Board board={board} makeMove={makeMove} />}
      {winner && <Result winner={winner} onRestart={handleRestart} />}
      {isPlayerTurn && !winner && playerChip && <p>It's your turn!</p>}
    </div>
  );
};

export default App;
