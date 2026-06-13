import Image from 'next/image';
import Link from 'next/link';

type Props = {
  colour: 'white' | 'dark' | 'new';
};

export default function SettleyLogo({ colour }: Props) {
  return (
    <Link
      href='/'
      className={colour === 'new' ? 'block w-[132px] overflow-hidden' : ''}
    >
      {colour === 'dark' && (
        <Image
          src='/svg/Logo DARK.svg'
          alt='settley logo'
          width={144}
          height={44}
          quality={100}
          className='w-[144px] h-auto'
        />
      )}
      {colour === 'white' && (
        <Image
          src='/svg/Logo WHITE.svg'
          alt='settley logo'
          width={144}
          height={44}
          quality={100}
          className='w-[144px] h-auto'
        />
      )}
      {colour === 'new' && (
        <Image
          src='/svg/Settley.svg'
          alt='settley logo'
          width={200}
          height={44}
          quality={100}
          className='w-[200px] max-w-none h-auto'
          priority
        />
      )}
    </Link>
  );
}
