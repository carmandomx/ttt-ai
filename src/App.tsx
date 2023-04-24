import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const App: React.FC = () => {
  const [chip, setChip] = useState<'X' | 'O' | null>(null); //Use State for the chip, it can be "X", "O" or null and is initialized in null.
  const [isChipSelected, setIsChipSelected] = useState<boolean>(false); //Use state to indicate if the user already has selected a chip, is is a boolean and it is initialized in false.

  const handleChipSelection = (selectedChip: 'X' | 'O') => { //Function to handle the click on the selecction of the chip, it has a prop that can only be a chip ("X" or "O")
    setChip(selectedChip); //Set the chp to the one selected
    setIsChipSelected(true); //Set to true the boolean indicating that the player has already selected a chip
  };

  return ( //The return statement defines the JSX to render the component
    <div className="App"> 
      <h1>TikTakToe vs A.I.</h1> {/*Headder that will display that text*/}
      {!isChipSelected && ( //This code block checks if isChipSelected is false. If it is, the JSX inside the parentheses is rendered. 
        <div className="chip-selection">
          <h2>Select your chip:</h2> {/*Another heading*/}
          {/*two buttons for selecting 'X' or 'O'. When a button is clicked, it calls the handleChipSelection function with the corresponding chip value. */}
          <button onClick={() => handleChipSelection('X')}>X</button> 
          <button onClick={() => handleChipSelection('O')}>O</button>
        </div>
      )}
      {isChipSelected && ( //This code block checks if isChipSelected is true. If it is, the JSX inside the parentheses is rendered. 
        <Board chip={chip as 'X' | 'O'} isChipSelected={isChipSelected} setIsChipSelected={setIsChipSelected} /> //the Board component receives the selected chip, the isChipSelected state, and the setIsChipSelected function as props.
      )}
    </div>
  );
};

export default App;
