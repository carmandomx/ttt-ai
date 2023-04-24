import React from "react";

interface ResultProps {
  winner: "X" | "O" | "Draw";
  onRestart: () => void;
}

const Result = ({ winner, onRestart }: ResultProps) => (
  <div className="results">
    <h2>{winner === "Draw" ? "It's a Draw!" : `${winner} wins!`}</h2>
    <button className="restart" onClick={onRestart}>
      Restart
    </button>
  </div>
);

export default Result;
