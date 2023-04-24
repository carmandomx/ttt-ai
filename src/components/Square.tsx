import React from 'react'

type SquareProps = {
  id: number,
  key: number,
  className: string,
  x:number,
  o:number,
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({id, key, className, x,o,onClick}) => {
  return (
    <div key={key} className={className} id={`${id}`} onClick={onClick}>{x ? "X" : (o ? "O":"")}</div>
  )
}
