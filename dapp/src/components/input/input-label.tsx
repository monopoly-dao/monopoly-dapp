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
      className={cn('text-xs font-medium md:text-sm lg:text-base', [
        className && className,
      ])}
    >
      {label}
    </label>
  );
};

export default InputLabel;
