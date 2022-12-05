import WithFirebaseAuth from '../utils/initAuth';
import Marquee from '../components/Marquee'
import Header from '../components/Header/'
import * as nearAPI from 'near-api-js';
import { ConnectConfig } from 'near-api-js';


function Dashboard(props){
  console.log('HOO', props)
  return (
    <div>
      <Header walletConnection={props}/>
      <Marquee />
    </div>
  )
}

Dashboard.getInitialProps = async () => {
  const { keyStores, connect, WalletConnection } = nearAPI;
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig: ConnectConfig = {
      networkId: "testnet",
      keyStore: myKeyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      headers: {}
};

  await connect(connectionConfig)
    .then(nearConnection => {
      const walletConnection = new WalletConnection(nearConnection, null);
      return { walletConnection: 'hey' };
    })
    .catch(error => {
      return { walletConnection: 'hey'}
    })

}

export default WithFirebaseAuth(Dashboard);