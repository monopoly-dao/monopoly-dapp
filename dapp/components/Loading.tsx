import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Loading() {
    return(
    <Box sx={{ 
        display: 'flex',
        background: 'black',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'

    }}>
        <CircularProgress sx={{
            color: 'white'
        }}/>
    </Box>
  );
}