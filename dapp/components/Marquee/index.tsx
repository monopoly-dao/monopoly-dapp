import styles from './Marquee.module.css'
import Image from 'next/image'
import image from 'public/assets/render.jpg'
export default function Marquee() {
    return (
        <div className={styles.marquee}>
            <div className={styles.left}>
                <h1>Start owning <br/>property</h1>
            </div>
            <div className={styles.right}>
                <h3>FEATURED PROPERTY</h3>
                <div className={styles.image}>
                    <Image src="https://pixura.imgix.net/https%3A%2F%2Fipfs.pixura.io%2Fipfs%2FQmQDcjUHor2taKNoQEVHGspfAbTGe4Hhruwryemr4d131E%2Frare_pass_01_THUMBNAIL.png?ixlib=js-v3.1.3&fit=clip&w=564&h=564&s=5c6543c75a77f6e2da426d58e6abb138" alt="property" width={500} height={600} objectFit="contain"/>
                </div>
            </div>
        </div>
    )
}