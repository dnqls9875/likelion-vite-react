import './chip.css';
import { ChipType } from '@/types/chip';

interface ChipProps {
  item: ChipType;
  index?: number;
  pressed?: boolean;
  onToggle?: (willChangePressedIndex: number) => void;
}

function Chip({ item, index, pressed = false, onToggle }: ChipProps) {
  const handleToggle = () => {
    if (index) {
      onToggle?.(index);
    }
  };

  return (
    <span
      role="button"
      className="Chip"
      tabIndex={0}
      aria-pressed={pressed}
      aria-disabled={pressed}
      onClick={handleToggle}
    >
      {item.label}
    </span>
  );
}

export default Chip;
