import React, { useState } from "react";
import useTikTakToe from "./hooks/useTikTakToe";
import "./App.css";

function App() {
  const { playerChip, board, isPlayerTurn, handleTileClick, setPlayerChip } =
    useTikTakToe();

  const handleChipSelect = (chip: string) => {
    setPlayerChip(chip);
  };

  return (
    <section className="App">
      <h1>Tik Tak Toe</h1>
      {playerChip === "" ? (
        <section>
          <h2>Select your chip</h2>
          <button onClick={() => handleChipSelect("X")}>X</button>
          <button onClick={() => handleChipSelect("O")}>O</button>
        </section>
      ) : (
        <h2>You have selected {playerChip}</h2>
      )}
    </section>
  );
}

export default App;
