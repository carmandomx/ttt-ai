import {useState} from "react";
import "./App.css";
import { TicTacToe } from "./components/tc-tac-toe";
import { AITicTacToe } from "./components/AI-tictactoe";

function App() {
  const [showTicTacToe, setShowTicTacToe] = useState<boolean>(false);
  const [showAITicTacToe, setShowAITicTacToe] = useState<boolean>(false);

  const handleEasyClick = () =>{
    setShowTicTacToe(true);
    setShowAITicTacToe(false);
    
  }
  const handleHardClick = () =>{
    setShowTicTacToe(false);
    setShowAITicTacToe(true);
  }


  return (
    <div className="App">
      <main>
        <button className="reset" onClick={handleEasyClick}> Easy Level</button>
        <button className="reset" onClick={handleHardClick}> Hard Level</button>
        {showTicTacToe && <TicTacToe />}
        {showAITicTacToe && <AITicTacToe />}
      </main>
    </div>
  );
}

export default App;
