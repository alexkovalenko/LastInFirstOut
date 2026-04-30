import { useMemo } from 'react';
import type { GameStore } from '../state/gameStore';
import { useGameStore } from '../state/gameStore';

const GameStatus = () => {
  const currentPlayer = useGameStore((state: GameStore) => state.currentPlayer);
  const winner = useGameStore((state: GameStore) => state.winner);
  const playerQueues = useGameStore((state: GameStore) => state.playerQueues);
  const resetGame = useGameStore((state: GameStore) => state.resetGame);

  const statusLabel = useMemo(() => {
    if (winner) {
      return `Player ${winner} wins!`;
    }
    return `Player ${currentPlayer}'s turn`;
  }, [currentPlayer, winner]);

  return (
    <section className="status-card">
      <div className="status-row">
        <div>
          <p className="status-label">Game status</p>
          <p className="status-value">{statusLabel}</p>
        </div>
        <div>
          <p className="status-label">Active queue</p>
          <p className="status-value">X: {playerQueues.X.length} / 3</p>
          <p className="status-value">O: {playerQueues.O.length} / 3</p>
        </div>
      </div>
      <div className="button-row">
        <button className="button" type="button" onClick={resetGame}>
          Restart game
        </button>
      </div>
    </section>
  );
};

export default GameStatus;
