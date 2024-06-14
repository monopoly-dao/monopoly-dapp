import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#141414',
  backgroundColor: '#FFF',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
  padding: '15px 40px',
  borderRadius: '8px',
  border: '1px solid gray',
  boxShadow: 'none',
  fontSize: '15px',
  textTransform: 'none',
  fontWeight: 'bold',
  marginBlock: '10px',
  width: 'inherit',
  fontFamily: 'Apfel Grotesk',
}));

export default function GoogleButton({
  type,
  children,
  handleClick,
  icon,
}: {
  type: 'text' | 'contained' | 'outlined';
  children: ReactNode;
  handleClick?: () => void;
  icon?: ReactNode;
}) {
  return (
    <ColorButton
      color='secondary'
      variant={type}
      onClick={handleClick}
      endIcon={icon}
    >
      {children}
    </ColorButton>
  );
}
