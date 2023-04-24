import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [chip, setChip] = useState<string | null>(null);

  if (chip === null) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Tik Tak Toe vs A.I.</h1>
          <p>Please choose your chip:</p>
          <button onClick={() => setChip('X')}>X</button>
          <button onClick={() => setChip('O')}>O</button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tik Tak Toe vs A.I.</h1>
        <p>You have chosen: {chip}</p>
      </header>
      <Board chip={chip as 'X' | 'O'} />
    </div>
  );
}

export default App;
