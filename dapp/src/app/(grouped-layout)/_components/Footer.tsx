import Image from 'next/image';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import SubscriptionForm from '@/app/_components/SubscriptionForm';

import FooterColumnLinks from './FooterColumnLinks';

const aboutLinks = [
  { label: 'The Team', href: '/team' },
  { label: 'How it works', href: '/faqs' },
  { label: 'Game', href: 'https://game.settley.co' },
];

// const exploreLinks = [
//   { label: 'Montenegro', href: '/' },
//   { label: 'Lisbon', href: '/' },
//   { label: 'Monaco', href: '/' },
//   { label: 'Abu Dhabi', href: '/' },
// ];

const followLinks = [
  // { label: 'Facebook', href: '/', icon: FaFacebook },
  // { label: 'Instagram', href: '/', icon: FaInstagram },
  {
    label: 'X',
    href: 'https://x.com/settleyApp',
    icon: FaXTwitter,
    openInNewTab: true,
  },
  // {
  //   label: 'Discord',
  //   href: 'https://discord.gg/x54J7un2 ',
  //   icon: FaDiscord,
  //   openInNewTab: true,
  // },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/settleyco',
    icon: FaLinkedin,
    openInNewTab: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/settley.co/',
    icon: FaInstagram,
    openInNewTab: true,
  },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/' },
  { label: 'Terms of Service', href: '/' },
  { label: 'Cookie Settings', href: '/' },
];

export default function Footer() {
  return (
    <>
      <footer className='mt-24 px-[5%]' id='footer'>
        <div className='grid grid-cols-2 lg:grid-cols-6 gap-10 justify-between mb-11 sm:mb-20'>
          <div className='col-span-2 lg:col-span-3'>
            <SubscriptionForm />
          </div>
          <div className='lg:col-span-1 justify-self-start lg:justify-self-center'>
            <FooterColumnLinks title='LINKS' links={aboutLinks} />
          </div>
          {/* <div className='justify-self-center sm:justify-self-start lg:justify-self-center'>
          <FooterColumnLinks title='Explore' links={exploreLinks} />
        </div> */}
          <div className='lg:col-span-1 justify-self-start lg:justify-self-center'>
            <FooterColumnLinks title='SOCIAL' links={followLinks} />
          </div>
          <div className='lg:col-span-1 justify-self-start lg:justify-self-center'>
            <FooterColumnLinks title='LEGAL' links={legalLinks} />
          </div>
        </div>
        <div className='border-t pb-10 sm:pb-20 bg-white text-black border-black pt-8 flex justify-center'>
          <p className='text-center font-general-sans text-sm text-[#1F1B20]'>
            © 2025 Settley. All rights reserved.
          </p>
          {/* <div className='flex items-center text-sm gap-6'>
          <Link href='/' className='underline'>
            Privacy Policy
          </Link>
          <Link href='/' className='underline'>
            Terms of Service
          </Link>
          <Link href='/' className='underline'>
            Cookie Settings
          </Link>
        </div> */}
        </div>
      </footer>

      <div className='mt-14'>
        <Image
          src='/svg/Settley-footer-logo.svg'
          alt='footer'
          width={500}
          height={500}
          className='w-full h-auto'
        />
      </div>
    </>
  );
}
