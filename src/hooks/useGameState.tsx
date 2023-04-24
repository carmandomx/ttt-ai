import { useState, useCallback } from 'react';

type GameState = 'active' | 'inactive';

const useGameState = (initialState: GameState = 'inactive'): [GameState, () => void, () => void] => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startGame = useCallback(() => {
    setGameState('active');
  }, []);

  const endGame = useCallback(() => {
    setGameState('inactive');
  }, []);

  return [gameState, startGame, endGame];
};

export default useGameState;