import AppBar from '@mui/material/AppBar';
import styles from '../styles/Dashboard.module.css'
import WithFirebaseAuth from '../utils/initAuth';

function Dashboard(){
  return (
    <div>
    <AppBar
      sx={{
        background: 'none',
        padding: '40px',
        fontFamily: 'Apfel Grotesk',
      }}
      ></AppBar>
    <div className={styles.dashboard}>
    </div>
    </div>
  )
}

export default WithFirebaseAuth(Dashboard);