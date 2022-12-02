import WithFirebaseAuth from '../utils/initAuth';
import AppBar from '../components/AppBar';

function Dashboard(){
  return (
    <AppBar />
  )
}

export default WithFirebaseAuth(Dashboard);