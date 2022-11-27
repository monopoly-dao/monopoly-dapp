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
    inputProps
}: {
    required: boolean,
    id?: string,
    label: string,
    defaultValue?: string,
    value: string,
    name: string,
    handleChange: (e: any) => void,
    type?: string,
    inputProps?: Object
}){
    return (
        <TextField
            required={required}
            id={id}
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