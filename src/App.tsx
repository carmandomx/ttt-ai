import React from 'react';
import './App.css';
import { Board } from './components/Board';
import { Square } from './components/Square';
import { Button } from './components/Buttons';
import { useState, useEffect } from 'react';
import useGameState from './hooks/useGameState';

const defaultSquares = (length=9): any[] => {
  return Array(length).fill(null);
}

const winnerLines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6],
];

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState("");
  const [gameState, startGame, endGame] = useGameState();


  const handleStartGame = () => {
    startGame();
  };

  const handleEndGame = () => {
    endGame();
  };

  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a:string|null,b:string|null,c:string|null) => {
      return winnerLines.filter(squareIndexes => {
        //console.log(squareIndexes)
        const squareValues = squareIndexes.map(index => squares[index]);
        //console.log(squareValues)
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      });
    };

    const emptyIndexes = squares
      .map((square,index) => square === null ? index : null)
      .filter(val => val !== null);

    const playerWon = linesThatAre('X', 'X', 'X').length > 0;
    const computerWon = linesThatAre('O', 'O', 'O').length > 0;

    if (playerWon) {
      setWinner('X');
      handleEndGame();
    }
    if (computerWon) {
      setWinner('O');
      handleEndGame();
    }

    const putComputerAt = (index:any) => {
      let newSquares = squares;
      newSquares[index] = 'O';
      setSquares([...newSquares]);
    };
    if(isComputerTurn){
      
      const winingLines = linesThatAre('O', 'O', null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        setTimeout(() => {
          putComputerAt(winIndex);
        }, 500);
        return;
      }

      const linesToBlock = linesThatAre('X', 'X', null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        setTimeout(() => {
          putComputerAt(blockIndex);
        }, 500);
        return;
      }

      const linesToContinue = linesThatAre('O', null, null);
      if (linesToContinue.length > 0) {
        setTimeout(() => {
          putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0]);
        }, 500);
        return;
      }
      const randomIndex = emptyIndexes[ Math.ceil(Math.random()*emptyIndexes.length) ];
      

      setTimeout(() => {
        putComputerAt(randomIndex);
      }, 500);
    }
  });


  const handleSquareClick=(index:number)=>{
    if(gameState=="active"){
      const isPlayerTurn = squares.filter(square => square != null).length % 2 === 0;
      if(isPlayerTurn){
        let newSquares = squares;
        newSquares[index] = "X";
        setSquares([...newSquares]);
      }
    }
    
  }
  return (
    <main>
      <Button text='X' onClick={handleStartGame}/>
      <Button text='Y' onClick={handleStartGame}/>
      <Board>
       {squares.map((square,index:number) => 
        <Square  
        id = {index}
        key = {index}
        className = 'square'
        x={square==="X"?1:0}
        o={square==="O"?1:0}
        onClick = {()=> handleSquareClick(index)} />)}
      </Board>
      <Button text='Restart Game' onClick={handleEndGame}/>
      {!!winner && winner === 'X' && (
        <div className="result green">
          You WON!
        </div>
      )}
      {!!winner && winner === 'O' && (
        <div className="result red">
          You LOST!
        </div>
      )}
    </main>
  );
}

export default App;
