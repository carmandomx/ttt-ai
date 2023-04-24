import { useState, useCallback } from 'react';

type WinnerState = ''|'X' | 'O' | "Draw";

const useWinnerState = (initialState: WinnerState = ''): [WinnerState, () => void, () => void , () => void] => {
  const [winnerState, setWinnerState] = useState<WinnerState>(initialState);

  const setWinnerX = useCallback(() => {
    setWinnerState('X');
  }, []);

  const setWinnerO = useCallback(() => {
    setWinnerState('O');
  }, []);
  const setWinnerDraw = useCallback(() => {
    setWinnerState('Draw');
  }, []);

  return [winnerState, setWinnerX , setWinnerO, setWinnerDraw];
};

export default useWinnerState;