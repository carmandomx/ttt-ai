import { useState, useCallback } from 'react';

type ChipState = 'X' | 'O';

const useChipState = (initialState: ChipState = 'X'): [ChipState, () => void, () => void] => {
  const [chipState, setChipState] = useState<ChipState>(initialState);

  const setUserChipX = useCallback(() => {
    setChipState('X');
  }, []);

  const setUserChipO = useCallback(() => {
    setChipState('O');
  }, []);

  return [chipState, setUserChipX, setUserChipO];
};

export default useChipState;