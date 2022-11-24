import Button, {ButtonProps} from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
    padding: '10px 35px',
    borderRadius: '8px',
    boxShadow: 'none',
    fontSize: '15px',
    textTransform: 'none',
    fontWeight: 'bold',

  }));

export default function MUIButton({type, children}:
    {type: 'text' | 'contained' | 'outlined',
        children: string})
    { return (
        <ColorButton variant={type}>{children}</ColorButton>
    );
}