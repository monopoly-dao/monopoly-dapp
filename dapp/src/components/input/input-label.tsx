import { cn } from '@/lib/utils';

interface InputLabelProps {
  id?: string;
  label?: string | React.ReactNode;
  className?: string;
}

const InputLabel = ({ id, label, className }: InputLabelProps) => {
  if (!id || !label) {
    return <></>;
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        'text-xs font-medium uppercase tracking-wider text-on-surface-variant font-inter',
        [className && className]
      )}
    >
      {label}
    </label>
  );
};

export default InputLabel;
