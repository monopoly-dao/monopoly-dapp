import "firebaseui/dist/firebaseui.css";
import styles from '../styles/Signup.module.css';

export default function Signup() {
    return (
        <div className={styles.signup}>
        <div className={styles.left}>
            <div className={styles.color}>
                <h1>Making real estate<br/>ownership accessible</h1>
            </div>
        </div>
        <div className={styles.right}>
            <h2>Get started with MonopolyDAO</h2>
            <p>Create your account and start purchasing<br/>properties in minutes</p>
        </div>
        </div>
    )
}