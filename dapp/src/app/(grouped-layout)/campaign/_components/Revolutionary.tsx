import RevolutionaryCard from './RevolutionaryCard';

import coin from '~/images/coins icon.png';
import globe from '~/images/globe icon.png';
import rocket from '~/images/rocket icon.png';
import shield from '~/images/shield icon.png';

const data = [
  {
    icon: rocket,
    title: 'Pioneer the Future',
    body: "We're not just building a platform—we're buying real property. Join the first 1,000 members and own a share of our $160,000 Spanish property. 6.17% rental yields. Legal ownership. Starting at $50.",
  },
  {
    icon: globe,
    title: 'Premium Portfolio',
    body: 'Our first property: $160,000 villa in Valencia, Spain. 6.17% rental yields. Purchase closing Q1 2026. Your founding membership converts to legal ownership tokens.',
  },
  {
    icon: coin,
    title: 'Collective Power',
    body: '1,000 members at $200 average = $160,000 property purchased. Each member owns their proportional share. Earn monthly rental income.',
  },
  {
    icon: shield,
    title: 'Transparent Journey',
    body: 'Current status: 237/1,000 members (23.7% funded). Campaign closes Dec 31 → Property purchase Q1 2026 → Tokens distributed Q2 2026',
  },
];

export default function Revolutionary() {
  return (
    <div className='flex flex-col px-[5%] gap-[50px] py-20 bg-[#FDF9FF]'>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3'>
        <h2 className='font-merriweather text-3xl lg:text-4xl'>
          Be Part of Something Revolutionary
        </h2>
        <div className='hidden xl:block' />
        {/* <p className='font-roboto font-light text-[#0D0D0D]'>
          We're not just building a platform—we're buying real property. Join
          the first 1,000 members and own a share of our $160,000 Spanish
          property. 6.17% rental yields. Legal ownership. Starting at $50.
        </p> */}
      </div>

      <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]'>
        {data.map((el, id) => (
          <RevolutionaryCard key={id} {...el} />
        ))}
      </div>
    </div>
  );
}
