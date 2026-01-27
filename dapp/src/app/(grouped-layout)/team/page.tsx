import { Metadata } from 'next';

import TeamCard from './_components/TeamCard';

const team = [
  {
    name: 'Temisan Gerrard',
    title: 'CEO',
    linkedin: 'https://www.linkedin.com/in/temisangerrard',
  },
  {
    name: 'Gbenga Ajiboye',
    title: 'CTO',
    linkedin: 'https://www.linkedin.com/in/gbenga-t-ajiboye/',
  },
  {
    name: 'Naro Omo-Osagie',
    title: 'CLO',
    linkedin: 'https://www.linkedin.com/in/naro-omo-osagie-b2a967131/',
  },
  {
    name: 'Efosa John',
    title: 'COO',
    linkedin: 'https://www.linkedin.com/in/efosa-john',
  },
];

import { siteConfig } from '@/constants/config';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'The Team | Settley',
  description: 'Meet the visionaries behind Settley—shaping the future of fractional property ownership.',
  keywords: [
    'Settley Team',
    'Temisan Gerrard',
    'Gbenga Ajiboye',
    'Naro Omo-Osagie',
    'Efosa John',
  ],
};

export default function Page() {
  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': team.map((member) => ({
      '@type': 'Person',
      'name': member.name,
      'jobTitle': member.title,
      'url': member.linkedin,
      'worksFor': {
        '@type': 'Organization',
        'name': 'Settley'
      }
    }))
  };

  return (
    <div className='px-[5%] lg:px-[7%] mt-20 mb-24'>
      <Script
        id='team-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <h1 className='text-[45px] w-full leading-[55px] text-center sm:leading-[75px] sm:text-[48px] mb-14 lg:mb-20 font-playfair font-bold text-navy'>
        The Team
      </h1>

      <div className='my-40 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-16 mx-[20%] sm:mx-0'>
        {team.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}
