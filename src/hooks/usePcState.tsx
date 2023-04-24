import { useState, useCallback } from 'react';

type PcState = 'X' | 'O';

const usePcState = (initialState: PcState = 'O'): [PcState, () => void, () => void] => {
  const [pcState, setPcState] = useState<PcState>(initialState);

  const setPcChipX = useCallback(() => {
    setPcState('X');
  }, []);

  const setPcChipO = useCallback(() => {
    setPcState('O');
  }, []);

  return [pcState, setPcChipX, setPcChipO];
};

export default usePcState;