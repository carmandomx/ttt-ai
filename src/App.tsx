import React from 'react';
import './App.css';
import { Board } from './components/Board';
import { Square } from './components/Square';
import { useState } from 'react';

const defaultSquares = (length=9): any[] => {
  return Array(length).fill(null);
}
function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const handleSquareClick=(index:number)=>{
    let newSquares = squares;
    newSquares[index] = "X";
    setSquares([...newSquares]);
  }
  return (
    <main>
      <Board>
       {squares.map((square,index:number) => 
        <Square  
        x={square==="X"?1:0}
        o={square==="O"?1:0}
        onClick = {()=> handleSquareClick(index)} />)}
      </Board>
    </main>
  );
}

export default App;
