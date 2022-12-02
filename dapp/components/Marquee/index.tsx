import styles from './Marquee.module.css'
import Image from 'next/image'
import image from 'public/assets/render.jpg'
export default function Marquee() {
    const hey = [1,2,3,4,5,6,7,8,9,0,0,2,3,4,5,6,6,7,7,8]
    return (
        <div>
        <div className={styles.marquee}>
            <div className={styles.left}>
                <h1>BRAZILIAN ESTABLISHMENT — 2022</h1>
                <div className={styles.attribution}>
                    <div className={styles.card}>
                        <h3>Deed under</h3>
                        <p>Vault</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Property developer</h3>
                        <p>MonopolyDAO</p>
                    </div>
                </div>
                <div className={styles.attribution}>
                    <div className={styles.card}>
                        <h3>Shares left</h3>
                        <p><strong>1,500</strong>/5,000</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Mint date</h3>
                        <p>December 2, 2022</p>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <h3>FEATURED PROPERTY</h3>
                <div className={styles.image}>
                    <Image src="https://pixura.imgix.net/https%3A%2F%2Fipfs.pixura.io%2Fipfs%2FQmQDcjUHor2taKNoQEVHGspfAbTGe4Hhruwryemr4d131E%2Frare_pass_01_THUMBNAIL.png?ixlib=js-v3.1.3&fit=clip&w=564&h=564&s=5c6543c75a77f6e2da426d58e6abb138" alt="property" width={500} height={400} objectFit="contain"/>
                </div>
            </div>
        </div>
        <div className={styles.listings}>            
        <h2>Top listings</h2>
        <div className={styles.parent}>
            {hey.map((item, index) =><div key={index} className={styles.curated}></div>)}
        </div>
        </div>
        </div>
    )
}