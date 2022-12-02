import AppBar from '@mui/material/AppBar'

export default function Header() {
    return (
    <AppBar
        sx={{
        height: '100px',
        background: 'none',
        boxShadow: 'none',
        padding: '20px 40px',
        color: 'black'
    }}>
        Hey
    </AppBar>
    )
}