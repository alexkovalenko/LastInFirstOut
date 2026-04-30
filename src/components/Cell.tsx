import type { Cell, PendingRemoval } from '../state/types';
import AnimatedMarker from './AnimatedMarker';

interface CellProps {
  index: number;
  value: Cell;
  pendingRemoval: PendingRemoval | null;
  onClick: (index: number) => void;
  disabled?: boolean;
  onRemovalComplete?: () => void;
}

const Cell = ({ index, value, pendingRemoval, onClick, disabled, onRemovalComplete }: CellProps) => {
  const isRemoval = pendingRemoval?.cellIndex === index;
  const markerPlayer = isRemoval ? pendingRemoval.player : value;

  return (
    <button
      type="button"
      className={`cell${disabled || value !== null || isRemoval ? ' disabled' : ''}`}
      onClick={() => onClick(index)}
      disabled={disabled || value !== null || isRemoval}
      aria-label={value ? `Cell ${index + 1} contains ${value}` : `Empty cell ${index + 1}`}
    >
      {markerPlayer ? (
        <AnimatedMarker
          player={markerPlayer}
          isRemoving={isRemoval}
          onAnimationEnd={isRemoval ? onRemovalComplete : undefined}
        />
      ) : null}
    </button>
  );
};

export default Cell;
