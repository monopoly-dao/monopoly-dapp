'use client';

import Image from 'next/image';
import React from 'react';

export default function MarketsPage() {
  // Example data, replace with real data source or API call
  const marketRates = [
    {
      region: 'London',
      country: 'UK',
      price: '£1,200,000',
      change: '+2.5%',
      image: '/images/landing-banner.png',
    },
    {
      region: 'Paris',
      country: 'France',
      price: '€950,000',
      change: '+1.8%',
      image: '/images/france.png',
    },
    {
      region: 'Monaco',
      country: 'Monaco',
      price: '€3,500,000',
      change: '+3.2%',
      image: '/images/Monaco.png',
    },
    {
      region: 'Mykonos',
      country: 'Greece',
      price: '€800,000',
      change: '+1.1%',
      image: '/images/mykonos.png',
    },
    {
      region: 'Baku',
      country: 'Azerbaijan',
      price: '₼600,000',
      change: '+0.9%',
      image: '/images/Azerbaijan.png',
    },
  ];

  return (
    <main className='relative bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f9fafb] px-2 py-6 md:px-10 lg:px-32 font-n-montreal overflow-hidden'>
      {/* Decorative blurred background shapes */}
      <div className='pointer-events-none select-none absolute -z-10 top-0 left-0 w-full h-full'>
        <div className='absolute w-80 h-80 bg-[#c9ff63]/30 rounded-full blur-3xl left-[-6rem] top-[-4rem] animate-float-slow' />
        <div className='absolute w-96 h-96 bg-[#272343]/20 rounded-full blur-3xl right-[-8rem] top-32 animate-float-slower' />
        <div className='absolute w-60 h-60 bg-[#ffd6e0]/30 rounded-full blur-2xl left-1/2 bottom-[-5rem] animate-float' />
      </div>

      {/* Hero Section */}
      <section className='text-center mb-14 flex flex-col items-center justify-center relative z-10'>
        <h1 className='text-4xl md:text-6xl font-extrabold linear-gradient mb-4 drop-shadow-lg animate-fade-in-up'>
          <span className='inline-block bg-gradient-to-r from-[#272343] via-[#c9ff63] to-[#ffd6e0] bg-clip-text text-transparent'>
            Global Property Market Rates
          </span>
        </h1>
        <p className='text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto animate-fade-in-up delay-150'>
          Explore the latest property market rates across the world's most
          sought-after regions.
          <br className='hidden md:block' />
          <span className='text-[#272343] font-semibold'>Stay ahead</span> with
          real-time trends and make informed investment decisions.
        </p>
      </section>

      {/* Animated Market Ticker */}
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

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 32s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 2, 0.6, 1) both;
        }
        .animate-delay-200 {
          animation-delay: 0.2s !important;
        }
        .animate-delay-400 {
          animation-delay: 0.4s !important;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 18s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
