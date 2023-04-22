import { TileValue } from "./types/types";

type Props = {
  winner: TileValue | null;
  isDraw: boolean;
};
const ShowWinner = ({ winner, isDraw }: Props) => {
  let winningText = "";
  if (winner) {
    winningText = `The winner is : ${winner}`;
  } else if (isDraw) {
    winningText = "There was a Draw";
  }
  return <section>{winningText}</section>;
};

export default ShowWinner;
