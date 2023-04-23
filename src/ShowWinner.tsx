import { TileValue } from "./types/types";

type Props = {
  winner: TileValue | null;
  isDraw: boolean;
  resetGame: () => void;
};
const ShowWinner = ({ winner, isDraw, resetGame }: Props) => {
  //   const { resetGame } = useTikTakToe();
  let winningText = "";
  if (winner) {
    winningText = `The winner is : ${winner}`;
  } else if (isDraw) {
    winningText = "There was a Draw";
  }
  //   console.log({ resetGame });

  return (
    <section>
      <h1>{winningText}</h1>
      {(winner || isDraw) && (
        <button onClick={() => resetGame()}>Play again?</button>
      )}
    </section>
  );
};

export default ShowWinner;
