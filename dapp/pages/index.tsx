import WithFirebaseAuth from '../utils/initAuth';
import AppBar from '../components/AppBar';
import Marquee from '../components/Marquee'


function Dashboard(){
  return (
    <div>
      <Marquee />
    </div>
  )
}

export default WithFirebaseAuth(Dashboard);