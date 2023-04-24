import React from 'react';
import './Square.css';

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {//setting the squares
  return (
    <button className="square"  onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;