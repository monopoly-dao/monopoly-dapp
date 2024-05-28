import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
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
  { label: 'Jebbah', href: '/' },
];

const followLinks = [
  { label: 'Facebook', href: '/', icon: FaFacebook },
  { label: 'Instagram', href: '/', icon: FaInstagram },
  { label: 'X', href: '/', icon: FaXTwitter },
  { label: 'LinkedIn', href: '/', icon: FaLinkedin },
  { label: 'YouTube', href: '/', icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className='px-[5%] mb-10 sm:mb-20'>
      <div className='grid grid-cols-3 sm:grid-cols-6 gap-10 justify-between mb-11 sm:mb-20'>
        <div className='col-span-3'>
          <SubscriptionForm />
        </div>
        <div className='justify-self-center'>
          <FooterColumnLinks title='About' links={aboutLinks} />
        </div>
        <div className='justify-self-center'>
          <FooterColumnLinks title='Explore' links={exploreLinks} />
        </div>
        <div className='justify-self-center'>
          <FooterColumnLinks title='Follow Us' links={followLinks} />
        </div>
      </div>
      <div className='border-t border-black pt-8 flex items-center justify-between'>
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
