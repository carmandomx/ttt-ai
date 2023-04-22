import useTikTakToe from "./hooks/useTikTakToe";
import "./App.css";
import TikTakToeBoard from "./TikTakToeBoard";
import ShowWinner from "./ShowWinner";

function App() {
  // Get the custom hooks
  const { playerChip, board, winner, draw, handleTileClick, setPlayerChip } =
    useTikTakToe();

  const handleChipSelect = (chip: string) => {
    setPlayerChip(chip);
  };
  console.log({ winner });

  return (
    <section className="App">
      <h1>Tik Tak Toe</h1>
      <section className="chip-select">
        <p>Select your chip:</p>
        <button onClick={() => handleChipSelect("X")}>X</button>
        <button onClick={() => handleChipSelect("O")}>O</button>
      </section>
      {playerChip && (
        <TikTakToeBoard
          playerChip={playerChip}
          board={board}
          handleTileClick={handleTileClick}
        />
      )}
      <ShowWinner winner={winner} isDraw={draw} />
    </section>
  );
}

export default App;
