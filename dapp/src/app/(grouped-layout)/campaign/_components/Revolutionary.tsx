import RevolutionaryCard from './RevolutionaryCard';

import coin from '~/images/coins icon.png';
import globe from '~/images/globe icon.png';
import rocket from '~/images/rocket icon.png';
import shield from '~/images/shield icon.png';

const data = [
  {
    icon: rocket,
    title: 'Pioneer the Future',
    body: 'Join our founding community and help shape the future of property investment. Early members gain exclusive access to our innovative platform.',
  },
  {
    icon: globe,
    title: 'Premium Portfolio',
    body: "Access carefully curated properties across Europe's most promising markets—from historic Lisbon townhouses to modern Paris penthouses.",
  },
  {
    icon: coin,
    title: 'Collective Power',
    body: 'Your commitment joins a pool of like-minded investors, enabling us to acquire premium properties that appreciate over time.',
  },
  {
    icon: shield,
    title: 'Transparent Journey',
    body: 'Track our progress toward property acquisition milestones. Regular updates keep you informed of every step in our collective journey.',
  },
];

export default function Revolutionary() {
  return (
    <div className='flex flex-col px-[5%] gap-[50px] py-20 bg-[#FDF9FF]'>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3'>
        <h2 className='font-roboto font-medium text-3xl lg:text-4xl'>
          Be Part of Something Revolutionary
        </h2>
        <div className='hidden xl:block' />
        <p className='font-merriweather font-light text-[#0D0D0D]'>
          We're not just building a platform—we're creating the future of
          property ownership. Join us at the ground level and help shape this
          transformation.
        </p>
      </div>

      <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]'>
        {data.map((el, id) => (
          <RevolutionaryCard key={id} {...el} />
        ))}
      </div>
    </div>
  );
}
