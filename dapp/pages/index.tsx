import WithFirebaseAuth from '../utils/initAuth';
import Marquee from '../components/Marquee'
import Header from '../components/Header/'


function Dashboard(props){
  console.log('HOO', props)
  return (
    <div>
      <Header walletConnection={props}/>
      <Marquee />
    </div>
  )
}



export default WithFirebaseAuth(Dashboard);