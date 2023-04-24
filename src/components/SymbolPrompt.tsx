import React from 'react';
import './SymbolPrompt.css'

interface SymbolPromptProps {
  onSymbolSelect: (symbol: string) => void;
}

const SymbolPrompt: React.FC<SymbolPromptProps> = ({ onSymbolSelect }) => {
  return (
    <div className="symbol-prompt">
      <div><h1>Choose your symbol:</h1></div>
      <div className='buttons'>
      <button className='Choose' onClick={() => onSymbolSelect('X')}>X</button>
      <button className='Choose' onClick={() => onSymbolSelect('O')}>O</button>
    </div>
    </div>
  );
};

export default SymbolPrompt;