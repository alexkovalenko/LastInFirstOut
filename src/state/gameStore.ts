import { create } from 'zustand';
import type { GameState, GameMode, Difficulty, PlayerId } from './types';
import {
  applyMove,
  findWinningPlayer,
  getInitialBoard,
  getNextPlayer,
  isCellOccupied
} from '../logic/gameRules';
import { selectAIMove } from '../logic/ai';

export interface GameStore extends GameState {
  placeMove: (cellIndex: number, isAiMove?: boolean) => void;
  performComputerMove: () => void;
  startGame: (mode: GameMode, difficulty: Difficulty) => void;
  resetGame: () => void;
  completeRemoval: () => void;
}

const initialBoard = getInitialBoard();

export const useGameStore = create<GameStore>((set, get) => ({
  currentPlayer: 'X',
  board: initialBoard,
  playerQueues: { X: [], O: [] },
  winner: null,
  isGameOver: false,
  pendingRemoval: null,
  gameMode: 'two-player',
  aiDifficulty: 'easy',
  isComputerThinking: false,
  gameStarted: false,

  placeMove: (cellIndex, isAiMove = false) => {
    const state = get();
    if (!state.gameStarted || state.isGameOver) {
      return;
    }

    if (state.board[cellIndex] !== null || state.pendingRemoval?.cellIndex === cellIndex) {
      return;
    }

    if (!isAiMove && state.gameMode === 'vs-computer' && state.currentPlayer === 'O') {
      return;
    }

    const player = state.currentPlayer;
    const result = applyMove(state.board, state.playerQueues[player], player, cellIndex);
    const winner = findWinningPlayer(result.board);
    const nextPlayer = winner !== null ? player : getNextPlayer(player);

    set({
      board: result.board,
      playerQueues: {
        ...state.playerQueues,
        [player]: result.queue
      },
      pendingRemoval: result.removal,
      winner,
      isGameOver: winner !== null,
      currentPlayer: nextPlayer,
      isComputerThinking: isAiMove ? false : state.isComputerThinking
    });
  },

  performComputerMove: () => {
    const state = get();
    if (
      state.gameMode !== 'vs-computer' ||
      state.currentPlayer !== 'O' ||
      state.isGameOver ||
      !state.gameStarted
    ) {
      return;
    }

    const aiMove = selectAIMove(state.board, state.playerQueues, state.aiDifficulty, state.pendingRemoval);
    set({ isComputerThinking: true });
    get().placeMove(aiMove.cellIndex, true);
    set({ isComputerThinking: false });
  },

  startGame: (mode, difficulty) => {
    set({
      currentPlayer: 'X',
      board: getInitialBoard(),
      playerQueues: { X: [], O: [] },
      winner: null,
      isGameOver: false,
      pendingRemoval: null,
      gameMode: mode,
      aiDifficulty: difficulty,
      isComputerThinking: false,
      gameStarted: true
    });
  },

  resetGame: () => {
    set({
      currentPlayer: 'X',
      board: getInitialBoard(),
      playerQueues: { X: [], O: [] },
      winner: null,
      isGameOver: false,
      pendingRemoval: null,
      gameMode: 'two-player',
      aiDifficulty: 'easy',
      isComputerThinking: false,
      gameStarted: false
    });
  },

  completeRemoval: () => {
    set({ pendingRemoval: null });
  }
}));
