import Image from 'next/image';
import Link from 'next/link';

type Props = {
  colour: 'white' | 'dark' | 'new';
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
          className='w-[140px] lg:w-[170px] xl:w-[200px] h-auto'
          priority
        />
      )}
    </Link>
  );
}
