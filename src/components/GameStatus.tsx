import { useMemo } from 'react';
import type { GameStore } from '../state/gameStore';
import { useGameStore } from '../state/gameStore';

const GameStatus = () => {
  const currentPlayer = useGameStore((state: GameStore) => state.currentPlayer);
  const winner = useGameStore((state: GameStore) => state.winner);
  const resetGame = useGameStore((state: GameStore) => state.resetGame);
  const gameMode = useGameStore((state: GameStore) => state.gameMode);
  const aiDifficulty = useGameStore((state: GameStore) => state.aiDifficulty);
  const gameStarted = useGameStore((state: GameStore) => state.gameStarted);
  const isComputerThinking = useGameStore((state: GameStore) => state.isComputerThinking);

  const statusLabel = useMemo(() => {
    if (!gameStarted) {
      return 'Choose a mode to begin';
    }
    if (winner) {
      return `Player ${winner} wins!`;
    }
    if (gameMode === 'vs-computer' && currentPlayer === 'O') {
      return isComputerThinking ? 'Computer is thinking...' : 'Computer turn pending';
    }
    return `Player ${currentPlayer}'s turn`;
  }, [currentPlayer, winner, gameMode, gameStarted, isComputerThinking]);

  return (
    <section className="status-card">
      <div className="status-row">
        <div>
          <p className="status-label">Game status</p>
          <p className="status-value">{statusLabel}</p>
        </div>
      </div>
      <div className="status-row">
        <div>
          <p className="status-label">Mode</p>
          <p className="status-value">
            {gameStarted ? (gameMode === 'vs-computer' ? 'Computer Opponent' : 'Two Players') : 'Not started'}
          </p>
        </div>
        <div>
          <p className="status-label">Difficulty</p>
          <p className="status-value">{gameMode === 'vs-computer' ? aiDifficulty : 'N/A'}</p>
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
