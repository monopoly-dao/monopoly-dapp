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
          src='/svg/Logo DARK.svg'
          alt='settley logo'
          width={144}
          height={44}
          quality={100}
          className='w-[144px]'
        />
      )}
      {colour === 'white' && (
        <Image
          src='/svg/Logo WHITE.svg'
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
