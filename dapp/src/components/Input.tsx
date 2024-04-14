import { InputProps } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ChangeEventHandler } from 'react';

export type CustomInputProps = Omit<InputProps, 'error'> & {
  required: boolean;
  id?: string;
  label: string;
  defaultValue?: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  inputProps?: InputProps;
  autofocus?: boolean;
  error?: string;
  touched?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur: any;
};

export default function Input({
  required = false,
  id = 'outline-required',
  label,
  defaultValue,
  value,
  name,
  onChange,
  type,
  inputProps,
  autofocus = false,
  error,
  touched,
  onBlur,
}: CustomInputProps) {
  return (
    <div className='w-full'>
      <TextField
        required={required}
        autoFocus={autofocus}
        id={id}
        error={!!error && touched}
        label={label}
        defaultValue={defaultValue}
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        margin='normal'
        InputProps={inputProps}
        onBlur={onBlur}
      />
      {touched && error && <p className='text-xs text-red-600'>{error}</p>}
    </div>
  );
}
