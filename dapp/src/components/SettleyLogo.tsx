import Image from 'next/image';
import Link from 'next/link';

type Props = {
  colour: 'white' | 'dark';
};

export default function SettleyLogo({ colour }: Props) {
  return (
    <Link href='/'>
      {colour === 'dark' && (
        <Image
          src='/images/Logo 1.png'
          alt='settley logo'
          width={144}
          height={44}
          quality={100}
          className='w-[144px]'
        />
      )}
      {colour === 'white' && (
        <Image
          src='/images/Logo WHITE.png'
          alt='settley logo'
          width={144}
          height={44}
          quality={100}
          className='w-[144px]'
        />
      )}
    </Link>
  );
}
