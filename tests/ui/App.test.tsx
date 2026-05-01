import { describe, expect, it } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

describe('App', () => {
  it('renders the game title and mode selection when not started', () => {
    render(<App />);

    expect(screen.getByText('Last-In, First-Out')).toBeDefined();
    expect(screen.getByText('Choose game mode')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeDefined();
  });

  it('starts a vs-computer game and displays the board', async () => {
    const user = userEvent.setup();
    render(<App />);

    await act(async () => {
      await user.click(screen.getByLabelText('Play vs Computer'));
      await user.click(screen.getByLabelText('Medium'));
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
    });

    await waitFor(() => expect(screen.getByTestId('board')).toBeDefined());
    expect(screen.getByText('Mode')).toBeDefined();
    expect(screen.getByText('Computer Opponent')).toBeDefined();
  });
});
