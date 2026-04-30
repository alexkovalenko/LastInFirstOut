import Board from './components/Board';
import GameStatus from './components/GameStatus';

const App = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Last-In, First-Out</h1>
        <p className="subtitle">Sliding Tic Tac Toe — max 3 active marks per player</p>
      </header>
      <main className="app-main">
        <GameStatus />
        <Board />
      </main>
    </div>
  );
};

export default App;
