import WithFirebaseAuth from '../utils/initAuth';
import Marquee from '../components/Marquee'
import Header from '../components/Header/'


function Dashboard(){
  return (
    <div>
      <Header />
      <Marquee />
    </div>
  )
}

export default WithFirebaseAuth(Dashboard);