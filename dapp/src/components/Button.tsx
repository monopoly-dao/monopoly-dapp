import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const ColorButton = styled(MuiButton)<ButtonProps>(() => ({
  color: 'white',
  backgroundColor: '#185366',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
  padding: '15px 40px',
  borderRadius: '8px',
  boxShadow: 'none',
  fontSize: '15px',
  textTransform: 'none',
  fontWeight: 'bold',
  marginBlock: '10px',
  width: 'inherit',
  fontFamily: 'Apfel Grotesk',
}));

type CustomButtonProps = ButtonProps & {
  icon?: ReactNode;
  isLoading?: boolean;
  variant: 'text' | 'contained' | 'outlined';
};

export default function Button({
  variant,
  children,
  icon,
  isLoading,
  ...rest
}: CustomButtonProps) {
  return (
    <ColorButton
      variant={variant}
      endIcon={icon}
      disabled={isLoading}
      {...rest}
      color='secondary'
    >
      {children}
    </ColorButton>
  );
}
