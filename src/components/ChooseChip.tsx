import useChooseChip from "../hooks/useChooseChip";

export const ChooseChip = () => {
  const [chosenChip, chooseX, chooseO] = useChooseChip();

//   if (chosenChip) {
//     return null; // El usuario ya eligió su ficha
//   }

  return (
    <div>
      <h1>Choose your chip:</h1>
      <button onClick={chooseX}>X</button>
      <button onClick={chooseO}>O</button>
      <p>The Chip is {chosenChip}</p>
    </div>
  );
};
