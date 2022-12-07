import Button, {ButtonProps} from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: 'white',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
    padding: '10px 20px 10px 5px',
    borderRadius: '50px',
    boxShadow: 'none',
    position: 'relative',
    fontSize: '13px',
    textTransform: 'none',
    fontWeight: 'bold',
    marginBlock: '10px',
    width: '170px',
    fontFamily: 'Apfel Grotesk'

  }));


export default function MUIButton({type, children, handleClick, icon}:
    {type: 'text' | 'contained' | 'outlined',
        children: any,
        handleClick?: (e: any) => void,
        icon?: any
    }){
        return (
        <ColorButton color="secondary" variant={type} onClick={handleClick} endIcon={icon}>{children}</ColorButton>
    );
}