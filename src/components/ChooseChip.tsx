import useChooseChip from "../hooks/useChooseChip";
import { Board } from "./Board";

export const ChooseChip = () => {
  const [chosenChip, chooseX, chooseO] = useChooseChip();

//   if (chosenChip) {
//     return null; // El usuario ya eligió su ficha
//   }

  return (
    <div>
      <h1>Choose your chip:</h1>
      <button className="bttnChoose" onClick={chooseX}>X</button>
      <button className="bttnChoose" onClick={chooseO}>O</button>
      <p>The Chip is {chosenChip}</p>

      <Board />
    </div>
  );
};
