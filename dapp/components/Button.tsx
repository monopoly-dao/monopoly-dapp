import Button, {ButtonProps} from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)<ButtonProps>(() => ({
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
    fontFamily: 'Apfel Grotesk'

  }));


export default function MUIButton({type, children, handleClick, icon}:
    {type: 'text' | 'contained' | 'outlined',
        children: string,
        handleClick?: () => void,
        icon?: any
    }){
        return (
        <ColorButton color="secondary" variant={type} onClick={handleClick} endIcon={icon}>{children}</ColorButton>
    );
}