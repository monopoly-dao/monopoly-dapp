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
    <footer className='bg-[#0B1221] pt-16 md:pt-24 pb-12 px-[5%] lg:px-[7%] text-white overflow-hidden' id='footer'>
      <div className='max-w-7xl mx-auto'>
        {/* Top Grid: Logo | Links | Social | Legal */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-24'>
          {/* Brand / Logo */}
          <div className='col-span-1 md:col-span-2 lg:col-span-3'>
            <h2 className='font-playfair font-bold text-3xl text-white mb-6'>
              S.
            </h2>
          </div>

          {/* Links */}
          <div className='col-span-1 lg:col-span-3 justify-self-start lg:justify-self-center w-full max-w-xs'>
            <FooterColumnLinks title='LINKS' links={aboutLinks} />
          </div>

          {/* Social */}
          <div className='col-span-1 lg:col-span-3 justify-self-start lg:justify-self-center w-full max-w-xs'>
            <FooterColumnLinks title='SOCIAL' links={followLinks} />
          </div>

          {/* Legal */}
          <div className='col-span-1 lg:col-span-3 justify-self-start lg:justify-self-center w-full max-w-xs'>
            <FooterColumnLinks title='LEGAL' links={legalLinks} />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Newsletter */}
        <div className='border-t border-white/10 pt-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8'>
          <p className='text-white/60 text-sm font-inter'>
            © {new Date().getFullYear()} Settley. All rights reserved.
          </p>

          <div className='w-full lg:w-auto min-w-[300px]'>
            <SubscriptionForm />
          </div>
        </div>

        {/* Bottom Badge (Optional, mimics "Made with Manus" placement if needed, or just padding) */}
      </div>
    </footer>
  );
}
