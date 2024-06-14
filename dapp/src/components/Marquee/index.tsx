import Image from 'next/image';

import styles from './Marquee.module.css';

export default function Marquee() {
  const hey = [
    {
      name: 'House',
      src: 'https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'another house',
      src: 'https://images.pexels.com/photos/1590336/pexels-photo-1590336.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'house3',
      src: 'https://images.pexels.com/photos/750697/pexels-photo-750697.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'another',
      src: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'House',
      src: 'https://images.pexels.com/photos/2371975/pexels-photo-2371975.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'another house',
      src: 'https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'house3',
      src: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      name: 'another',
      src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
  ];

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
              <p>
                <strong>1,500</strong>/5,000
              </p>
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
            <Image
              src='https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='property'
              width={500}
              height={400}
              objectFit='contain'
            />
          </div>
        </div>
      </div>
      <div className={styles.listings}>
        <h2>Top listings</h2>
        <div className={styles.parent}>
          {hey.map((item, index) => (
            <div key={index}>
              <div className={styles.curated}>
                <Image src={item.src} alt='property' fill />
              </div>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
