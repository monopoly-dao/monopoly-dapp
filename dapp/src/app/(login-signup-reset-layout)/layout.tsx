import Image from 'next/image';
import { PropsWithChildren } from 'react';

import styles from '../../styles/Signup.module.css';

export default function LoginSignupResetLayout({
  children,
}: PropsWithChildren) {
  return (
    <div>
      <div className={styles.signup}>
        <div className={styles.left}>
          <Image src='/assets/red.jpg' alt='signup splash' fill priority />
        </div>
        {children}
      </div>
    </div>
  );
}
