import React from "react";
import { TileValue } from "./types/types";
import "./TikTakToeBoard.css";

type Props = {
  board: TileValue[];
  playerChip: string;
  handleTileClick: (index: number) => void;
};

const TikTakToeBoard: React.FC<Props> = ({
  board,
  handleTileClick,
  playerChip,
}) => {
  return (
    <div className="board">
      {board.map((tile, index) => (
        <div
          className="tile"
          key={index}
          onClick={() => handleTileClick(index)}
        >
          {tile === "" ? playerChip : tile}
        </div>
      ))}
      HELLOOOOOOOOOOOOO
    </div>
  );
};

export default TikTakToeBoard;
