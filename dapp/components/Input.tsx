import TextField from '@mui/material/TextField';

export default function Input({
    required = false,
    id = 'outline-required',
    label,
    defaultValue,
    value,
    name,
    handleChange,
    type,
    inputProps,
    autofocus=false,
    error,
}: {
    required: boolean,
    id?: string,
    label: string,
    defaultValue?: string,
    value: string,
    name: string,
    handleChange: (e: any) => void,
    type?: string,
    inputProps?: Object,
    autofocus?: boolean,
    error: boolean
}){
    return (
        <TextField
            required={required}
            autoFocus={autofocus}
            id={id}
            error={error}
            label={label}
            defaultValue={defaultValue}
            value={value}
            name={name}
            onChange={handleChange}
            type={type}
            margin="normal"
            InputProps={inputProps}
      />
    )
};