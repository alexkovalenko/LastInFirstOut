import { create } from 'zustand';
import type { GameState, PlayerId } from './types';
import { applyMove, findWinningPlayer, getInitialBoard, getNextPlayer } from '../logic/gameRules';

export interface GameStore extends GameState {
  placeMove: (cellIndex: number) => void;
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

  placeMove: (cellIndex) => {
    const state = get();
    if (state.isGameOver) {
      return;
    }

    if (state.board[cellIndex] !== null || state.pendingRemoval?.cellIndex === cellIndex) {
      return;
    }

    const player = state.currentPlayer;
    const result = applyMove(state.board, state.playerQueues[player], player, cellIndex);
    const winner = findWinningPlayer(result.board);

    set({
      board: result.board,
      playerQueues: {
        ...state.playerQueues,
        [player]: result.queue
      },
      pendingRemoval: result.removal,
      winner,
      isGameOver: winner !== null,
      currentPlayer: winner !== null ? player : getNextPlayer(player)
    });
  },

  resetGame: () => {
    set({
      currentPlayer: 'X',
      board: getInitialBoard(),
      playerQueues: { X: [], O: [] },
      winner: null,
      isGameOver: false,
      pendingRemoval: null
    });
  },

  completeRemoval: () => {
    set({ pendingRemoval: null });
  }
}));
