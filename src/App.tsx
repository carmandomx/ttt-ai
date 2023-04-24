import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const App: React.FC = () => {
  const [chip, setChip] = useState<'X' | 'O' | null>(null);
  const [isChipSelected, setIsChipSelected] = useState<boolean>(false);

  const handleChipSelection = (selectedChip: 'X' | 'O') => {
    setChip(selectedChip);
    setIsChipSelected(true);
  };

  return (
    <div className="App">
      <h1>TikTakToe vs A.I.</h1>
      {!isChipSelected && (
        <div className="chip-selection">
          <h2>Select your chip:</h2>
          <button onClick={() => handleChipSelection('X')}>X</button>
          <button onClick={() => handleChipSelection('O')}>O</button>
        </div>
      )}
      {isChipSelected && (
        <Board chip={chip as 'X' | 'O'} isChipSelected={isChipSelected} setIsChipSelected={setIsChipSelected} />
      )}
    </div>
  );
};

export default App;
