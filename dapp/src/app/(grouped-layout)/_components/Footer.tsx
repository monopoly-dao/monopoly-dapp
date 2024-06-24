import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import SubscriptionForm from '@/app/_components/SubscriptionForm';

import FooterColumnLinks from './FooterColumnLinks';

const aboutLinks = [
  { label: 'The Team', href: '/' },
  { label: 'Why Settley?', href: '/' },
  { label: 'How it works', href: '/' },
];

const exploreLinks = [
  { label: 'Montenegro', href: '/' },
  { label: 'Lisbon', href: '/' },
  { label: 'Monaco', href: '/' },
  { label: 'Abu Dhabi', href: '/' },
];

const followLinks = [
  // { label: 'Facebook', href: '/', icon: FaFacebook },
  // { label: 'Instagram', href: '/', icon: FaInstagram },
  {
    label: 'X',
    href: 'https://x.com/settleyApp',
    icon: FaXTwitter,
    openInNewTab: true,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/x54J7un2 ',
    icon: FaDiscord,
    openInNewTab: true,
  },
];

export default function Footer() {
  return (
    <footer className='mt-24 px-[5%] lg:px-[7%]'>
      <div className='grid grid-cols-3 lg:grid-cols-6 gap-10 justify-between mb-11 sm:mb-20'>
        <div className='col-span-3'>
          <SubscriptionForm />
        </div>
        <div className='justify-self-center sm:justify-self-start lg:justify-self-center'>
          <FooterColumnLinks title='About' links={aboutLinks} />
        </div>
        <div className='justify-self-center sm:justify-self-start lg:justify-self-center'>
          <FooterColumnLinks title='Explore' links={exploreLinks} />
        </div>
        <div className='justify-self-center sm:justify-self-start lg:justify-self-center'>
          <FooterColumnLinks title='Follow Us' links={followLinks} />
        </div>
      </div>
      <div className='border-t pb-10 sm:pb-20 bg-white text-black border-black pt-8 flex flex-col gap-4 sm:gap-0 sm:flex-row items-start sm:items-center justify-between'>
        <p>© 2024 Settley. All rights reserved.</p>
        <div className='flex items-center text-sm gap-6'>
          <Link href='/' className='underline'>
            Privacy Policy
          </Link>
          <Link href='/' className='underline'>
            Terms of Service
          </Link>
          <Link href='/' className='underline'>
            Cookie Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
