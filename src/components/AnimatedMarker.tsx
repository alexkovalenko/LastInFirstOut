import type { PlayerId } from '../state/types';

interface AnimatedMarkerProps {
  player: PlayerId;
  isRemoving?: boolean;
  onAnimationEnd?: () => void;
}

const AnimatedMarker = ({ player, isRemoving = false, onAnimationEnd }: AnimatedMarkerProps) => {
  return (
    <span
      className={`marker ${player.toLowerCase()}${isRemoving ? ' removal-marker' : ''}`}
      onAnimationEnd={onAnimationEnd}
      data-testid={isRemoving ? 'removal-marker' : 'marker'}
    >
      {player}
    </span>
  );
};

export default AnimatedMarker;
