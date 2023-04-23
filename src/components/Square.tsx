import React from 'react'

export const Square = (props:any) => {
  return (
    <div className='square'{...props}>{props.x ? "X" : (props.o ? "O":"")}</div>
  )
}
