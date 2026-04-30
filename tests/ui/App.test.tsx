import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('renders the game title and board', () => {
    render(<App />);

    expect(screen.getByText('Last-In, First-Out')).toBeDefined();
    expect(screen.getByTestId('board')).toBeDefined();
  });
});
