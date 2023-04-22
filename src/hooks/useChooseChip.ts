import { useState } from 'react';

export type Chip = 'X' | 'O';

const useChooseChip = (): [Chip | undefined, () => void, () => void] => {
  const [chosenChip, setChosenChip] = useState<Chip>();

  const chooseX = () => setChosenChip('X');
  const chooseO = () => setChosenChip('O');

  return [chosenChip, chooseX, chooseO];
};

export default useChooseChip;
