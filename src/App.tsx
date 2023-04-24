import React, { useState } from 'react';
import Game from './components/Game';
import SymbolPrompt from './components/SymbolPrompt';
import './App.css'

const App: React.FC = () => {
  const [playerSymbol, setPlayerSymbol] = useState('');

  const handleSymbolSelect = (symbol: string) => {
    setPlayerSymbol(symbol);
  };

  return (
    <div className="App">
      <div className='appTitle'><h1>TIC TAC TOE APP</h1></div>
      <div>
      {playerSymbol ? (
        <Game playerSymbol={playerSymbol} />
      ) : (
        <SymbolPrompt onSymbolSelect={handleSymbolSelect} />
      )}
      </div>
    </div>
  );
};

export default App;