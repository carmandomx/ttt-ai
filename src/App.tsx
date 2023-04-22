import React, { useState } from "react";
import useTikTakToe from "./hooks/useTikTakToe";
import "./App.css";
import TikTakToeBoard from "./TikTakToeBoard";

function App() {
  // Get the custom hooks
  const { playerChip, board, isPlayerTurn, handleTileClick, setPlayerChip } =
    useTikTakToe();

  const handleChipSelect = (chip: string) => {
    setPlayerChip(chip);
  };

  console.log({ board });

  return (
    <div className="App">
      <h1>Tik Tak Toe</h1>
      <div className="chip-select">
        <p>Select your chip:</p>
        <button onClick={() => handleChipSelect("X")}>X</button>
        <button onClick={() => handleChipSelect("O")}>O</button>
      </div>
      {playerChip && (
        <TikTakToeBoard
          playerChip={playerChip}
          board={board}
          handleTileClick={handleTileClick}
        />
      )}
    </div>
    // <section className="App">
    //   <h1>Tik Tak Toe</h1>
    //   {playerChip === "" ? (
    //     <section>
    //       <h2>Select your chip</h2>
    //       <button onClick={() => handleChipSelect("X")}>X</button>
    //       <button onClick={() => handleChipSelect("O")}>O</button>
    //     </section>
    //   ) : (
    //     <section>
    //       <h2>You are playing as: {playerChip}</h2>
    //       <section className="board">
    //         {board.map((value, index) => (
    //           <section
    //             key={index}
    //             className="tile"
    //             onClick={() => handleTileClick(index)}
    //           >
    //             {value}
    //           </section>
    //         ))}
    //       </section>
    //     </section>
    //   )}
    // </section>
  );
}

export default App;
