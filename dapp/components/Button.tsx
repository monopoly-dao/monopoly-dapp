import Button, {ButtonProps} from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Wallet } from '../near/near-wallet';
import { useEffect } from 'react';
import { StaticImageData } from 'next/image';

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
    marginBlock: '10px'

  }));


export default function MUIButton({type, children, handleClick, icon}:
    {type: 'text' | 'contained' | 'outlined',
        children: string,
        handleClick?: () => void,
        icon?: any
    })
    {   const CONTRACT_ADDRESS = "godbrand.testnet";
        const wallet = new Wallet({
            createAccessKeyFor: CONTRACT_ADDRESS
        })

        useEffect(() => {
            if (window) {
                window.onload = async () => {
                    let isSignedIn = await wallet.startUp();
                    console.log(isSignedIn, 'meep');
            }
        }
        window.onload = async () => {
            let isSignedIn = await wallet.startUp();
            console.log(isSignedIn, 'meep');
    }
        }, [])
        return (
        <ColorButton color="secondary" variant={type} onClick={handleClick} endIcon={icon}>{children}</ColorButton>
    );
}