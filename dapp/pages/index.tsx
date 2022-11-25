import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import Jumbotron from '../components/Jumbotron'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Jumbotron />
    </div>
  )
}
