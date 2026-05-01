import { useCallback } from 'react';
import type { GameStore } from '../state/gameStore';
import { useGameStore } from '../state/gameStore';
import Cell from './Cell';

const Board = () => {
  const board = useGameStore((state: GameStore) => state.board);
  const pendingRemoval = useGameStore((state: GameStore) => state.pendingRemoval);
  const isGameOver = useGameStore((state: GameStore) => state.isGameOver);
  const isComputerThinking = useGameStore((state: GameStore) => state.isComputerThinking);
  const currentPlayer = useGameStore((state: GameStore) => state.currentPlayer);
  const gameMode = useGameStore((state: GameStore) => state.gameMode);
  const placeMove = useGameStore((state: GameStore) => state.placeMove);
  const completeRemoval = useGameStore((state: GameStore) => state.completeRemoval);

  const disabled = isGameOver || isComputerThinking || (gameMode === 'vs-computer' && currentPlayer === 'O');

  const handleCellClick = useCallback(
    (index: number) => {
      if (disabled) {
        return;
      }
      placeMove(index);
    },
    [disabled, placeMove]
  );

  return (
    <div className="board" data-testid="board">
      {board.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          pendingRemoval={pendingRemoval}
          onClick={handleCellClick}
          disabled={disabled}
          onRemovalComplete={completeRemoval}
        />
      ))}
    </div>
  );
};

export default Board;
