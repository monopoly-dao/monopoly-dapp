import WithFirebaseAuth from '../utils/initAuth';
import Marquee from '../components/Marquee'
import Header from '../components/Header/'


function Dashboard(props: any){
  const signInDetails = {
    name: props.displayName,
    photo: props.photoURL
  }
  return (
    <div>
      <Header signInDetails={signInDetails}/>
      <Marquee />
    </div>
  )
}



export default WithFirebaseAuth(Dashboard);