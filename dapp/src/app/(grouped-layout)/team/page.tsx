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

export const metadata: Metadata = {
  title: 'The Team',
  keywords: [
    'Settley',
    'Team',
    'Members',
    'Settley Team',
    'Settley Team',
    'SettleyCo Team',
    'Settley co',
  ],
};

export default function Page() {
  return (
    <div className='px-[5%] lg:px-[7%] mt-20 mb-24'>
      <h1 className='text-[45px] w-full leading-[55px] text-center sm:leading-[75px] sm:text-[48px] mb-14 lg:mb-20'>
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
