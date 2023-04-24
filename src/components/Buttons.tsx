import React from 'react';

type ButtonProps = {
  text: string;
  className:string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className}) => {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  );
}
