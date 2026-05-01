import { useEffect, useState } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import { useGameStore } from './state/gameStore';
import type { GameMode, Difficulty } from './state/types';

const App = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('two-player');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');

  const gameStarted = useGameStore((state) => state.gameStarted);
  const gameMode = useGameStore((state) => state.gameMode);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const isComputerThinking = useGameStore((state) => state.isComputerThinking);
  const startGame = useGameStore((state) => state.startGame);
  const performComputerMove = useGameStore((state) => state.performComputerMove);

  useEffect(() => {
    if (
      gameStarted &&
      gameMode === 'vs-computer' &&
      currentPlayer === 'O' &&
      !isGameOver &&
      !isComputerThinking
    ) {
      const timer = window.setTimeout(performComputerMove, 500);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [gameStarted, gameMode, currentPlayer, isGameOver, isComputerThinking, performComputerMove]);

  const handleStartGame = () => {
    startGame(selectedMode, selectedDifficulty);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Last-In, First-Out</h1>
        <p className="subtitle">Sliding Tic Tac Toe — max 3 active marks per player</p>
      </header>

      <main className="app-main">
        {!gameStarted ? (
          <section className="setup-card">
            <h2>Choose game mode</h2>
            <div className="option-row">
              <label>
                <input
                  type="radio"
                  name="gameMode"
                  value="two-player"
                  checked={selectedMode === 'two-player'}
                  onChange={() => setSelectedMode('two-player')}
                />
                Two Players
              </label>
              <label>
                <input
                  type="radio"
                  name="gameMode"
                  value="vs-computer"
                  checked={selectedMode === 'vs-computer'}
                  onChange={() => setSelectedMode('vs-computer')}
                />
                Play vs Computer
              </label>
            </div>
            {selectedMode === 'vs-computer' && (
              <div className="option-row">
                <label>
                  <input
                    type="radio"
                    name="difficulty"
                    value="easy"
                    checked={selectedDifficulty === 'easy'}
                    onChange={() => setSelectedDifficulty('easy')}
                  />
                  Easy
                </label>
                <label>
                  <input
                    type="radio"
                    name="difficulty"
                    value="medium"
                    checked={selectedDifficulty === 'medium'}
                    onChange={() => setSelectedDifficulty('medium')}
                  />
                  Medium
                </label>
              </div>
            )}
            <button className="button" type="button" onClick={handleStartGame}>
              Start Game
            </button>
          </section>
        ) : (
          <GameStatus />
        )}
        <Board />
      </main>
    </div>
  );
};

export default App;
