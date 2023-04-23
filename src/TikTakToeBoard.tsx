import { TileValue } from "./types/types";
import "./TikTakToeBoard.css";

type Props = {
  board: TileValue[];
  playerChip: string;
  handleTileClick: (index: number) => void;
};

const TikTakToeBoard = ({ board, playerChip, handleTileClick }: Props) => {
  return (
    <section className="board">
      {board.map((tile, index) => (
        <section
          className="tile"
          key={index}
          onClick={() => handleTileClick(index)}
        >
          {tile === "" ? playerChip : tile}
        </section>
      ))}
    </section>
  );
};

export default TikTakToeBoard;
