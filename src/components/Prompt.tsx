import React from "react";

interface PromptProps {
  onSelectChip: (chip: "X" | "O") => void;
}

const Prompt = ({ onSelectChip }: PromptProps) => (
  <div>
    <h2>Select your chip:</h2>
    <div className="chip-buttons">
      <button className="chip-option" onClick={() => onSelectChip("X")}>
        X
      </button>
      <button className="chip-option" onClick={() => onSelectChip("O")}>
        O
      </button>
    </div>
  </div>
);

export default Prompt;
