import React from 'react';
import './App.css';
import { Board } from './components/Board';
import { Square } from './components/Square';
import { Button } from './components/Buttons';
import { useState, useEffect } from 'react';
import useGameState from './hooks/useGameState';
import useChipState from './hooks/useChipState';
import usePcState from './hooks/usePcState';
import useWinnerState from './hooks/useWinnerState';

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
  const [winnerState, setWinnerX, setWinnerO, setWinnerDraw] = useWinnerState();
  const [gameState, startGame, endGame] = useGameState();
  const [chipState, setUserChipX, setUserChipO] = useChipState();
  const [pcState, setPcChipX, setPcChipO] = usePcState();


  const handleStartGame = () => {
    startGame();
  };

  const handleEndGame = () => {
    endGame();
  };

  const cleanBoard = ()=>{
    setSquares(defaultSquares())
  }

  const reStartGame = () =>{
    handleEndGame();
    cleanBoard();
    
    
    
  }

  const setUserChipToX = ()=>{
    setUserChipX();
    setPcChipO();
    handleStartGame();
    
  }
  const setUserChipToO = ()=>{
    setUserChipO();
    setPcChipX();
    handleStartGame();
  }

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

    const playerWon = linesThatAre(chipState, chipState, chipState).length > 0;
    const computerWon = linesThatAre(pcState, pcState, pcState).length > 0;
    const isNullsquare = (element:any) => element  === null;
    const draw = squares.some(isNullsquare);

    if (playerWon) {
      if(chipState==='X'){
        setWinnerX();
      }else{
        setWinnerO();
      }
      
      handleEndGame();
    }
    if (computerWon) {
      if(pcState==='O'){
        setWinnerO();
      }else{
        setWinnerX();
      }
      handleEndGame();
    }

    if(!draw){
      setWinnerDraw();
      handleEndGame();
      console.log(winnerState)
    }

    const putComputerAt = (index:any) => {
      let newSquares = squares;
      newSquares[index] = pcState;
      setSquares([...newSquares]);
    };
    if(isComputerTurn){
      
      const winingLines = linesThatAre(pcState, pcState, null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        setTimeout(() => {
          putComputerAt(winIndex);
        }, 500);
        return;
      }

      const linesToBlock = linesThatAre(chipState, chipState, null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        setTimeout(() => {
          putComputerAt(blockIndex);
        }, 500);
        return;
      }

      const linesToContinue = linesThatAre(pcState, null, null);
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
    if(gameState==="active"){
      const isPlayerTurn = squares.filter(square => square != null).length % 2 === 0;
      if(isPlayerTurn){
        let newSquares = squares;
        newSquares[index] = chipState;
        setSquares([...newSquares]);
      }
    }
    
  }
  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <div className='button-container'>
        <Button className='X' text='X' onClick={setUserChipToX}/>
        <Button className='O'text='O' onClick={setUserChipToO}/>
      </div>
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
      <Button className='Restart' text='Restart Game' onClick={ reStartGame}/>
      {!!winnerState && winnerState === chipState && (
        <div className="result green">
          You WON!
        </div>
      )}
      {!!winnerState && winnerState === pcState && (
        <div className="result red">
          You LOST!
        </div>
      )}
      {!!winnerState && winnerState === "Draw" && (
        <div className="result red">
          Its a Draw!
        </div>
      )}
    </main>
  );
}

export default App;
