import Image from 'next/image';
import React from 'react';

type Market = {
  region: string;
  country: string;
  price: string;
  change: string;
  image: string;
};

interface MarketTickerProps {
  marketRates: Market[];
}

const MarketTicker: React.FC<MarketTickerProps> = ({ marketRates }) => {
  return (
    <section className='relative w-full overflow-x-hidden py-2'>
      <div className='absolute left-0 top-0 w-full h-full pointer-events-none z-0 overflow-hidden'>
        <div className='w-full h-1/2 bg-gradient-to-r from-[#c9ff63]/10 via-white/0 to-[#ffd6e0]/10 blur-2xl opacity-60' />
      </div>
      <div className='relative z-10'>
        <div className='flex items-center gap-6 animate-ticker whitespace-nowrap will-change-transform min-h-[72px] max-h-[72px]'>
          {marketRates.concat(marketRates).map((market, idx) => (
            <div
              key={market.region + idx}
              className='flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 shadow-lg border border-[#e0e7ff] backdrop-blur-md mx-2 min-w-[260px] max-h-[56px] hover:scale-105 transition-transform duration-300'
              style={{
                animationDelay: `${(idx % marketRates.length) * 100}ms`,
              }}
            >
              <div className='relative w-10 h-10 rounded-full overflow-hidden border border-[#c9ff63] shadow'>
                <Image
                  src={market.image}
                  alt={market.region}
                  fill
                  className='object-cover object-center'
                  quality={90}
                  priority={false}
                />
              </div>
              <div className='flex flex-col justify-center'>
                <span className='text-xs font-semibold text-[#272343] tracking-wide uppercase leading-tight'>
                  {market.country}
                </span>
                <span className='text-base font-extrabold text-[#272343] leading-tight'>
                  {market.region}
                </span>
              </div>
              <div className='flex flex-col items-end ml-3 justify-center'>
                <span className='text-sm font-bold text-[#3c3949] leading-tight'>
                  {market.price}
                </span>
                <span
                  className={`text-xs font-bold ${
                    market.change.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-500'
                  } animate-pulse leading-tight`}
                >
                  {market.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketTicker;
